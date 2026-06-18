const Reserva = require('../reservas/modelo');
const Inventario = require('../inventario/modelo');
const Pedido = require('../pedidos/modelo');

const obtenerResumenDashboard = async () => {
  const reservasActivas = await Reserva.countDocuments({
    estado: { $in: ['Pendiente', 'Confirmada'] }
  });

  const totalProductos = await Inventario.countDocuments({
    activo: true
  });

  const productosBajoStock = await Inventario.find({
    activo: true,
    $expr: {
      $lte: ['$cantidadDisponible', '$nivelMinimo']
    }
  });

  const pedidosPendientes = await Pedido.countDocuments({
    estado: { $in: ['Pendiente', 'En preparación'] }
  });

  const ventasTotales = await Pedido.aggregate([
    {
      $match: {
        estado: { $ne: 'Cancelado' }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$total' }
      }
    }
  ]);

  const productosMasConsumidos = await Pedido.aggregate([
    { $unwind: '$productos' },
    {
      $group: {
        _id: '$productos.nombreProducto',
        cantidadTotal: { $sum: '$productos.cantidad' },
        ingresoTotal: { $sum: '$productos.subtotal' }
      }
    },
    { $sort: { cantidadTotal: -1 } },
    { $limit: 5 }
  ]);

  const alertas = productosBajoStock.map((producto) => {
    return `${producto.nombre} está por debajo del nivel mínimo`;
  });

  return {
    reservasActivas,
    totalProductos,
    productosBajoStock: productosBajoStock.length,
    pedidosPendientes,
    ventasTotales: ventasTotales[0]?.total || 0,
    productosMasConsumidos,
    alertas
  };
};

module.exports = {
  obtenerResumenDashboard
};