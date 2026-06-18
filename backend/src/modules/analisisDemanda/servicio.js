const Reserva = require('../reservas/modelo');
const Inventario = require('../inventario/modelo');
const Pedido = require('../pedidos/modelo');

const obtenerAnalisisDemanda = async () => {
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

  const reservasPorFecha = await Reserva.aggregate([
    {
      $group: {
        _id: '$fecha',
        totalReservas: { $sum: 1 },
        totalPersonas: { $sum: '$cantidadPersonas' }
      }
    },
    { $sort: { totalReservas: -1 } },
    { $limit: 5 }
  ]);

  const productosBajoStock = await Inventario.find({
    activo: true,
    $expr: {
      $lte: ['$cantidadDisponible', '$nivelMinimo']
    }
  });

  const recomendaciones = [];

  if (productosMasConsumidos.length > 0) {
    recomendaciones.push(
      `El producto con mayor demanda es ${productosMasConsumidos[0]._id}, con ${productosMasConsumidos[0].cantidadTotal} unidades consumidas.`
    );
  }

  if (reservasPorFecha.length > 0) {
    recomendaciones.push(
      `La fecha con mayor actividad registrada es ${reservasPorFecha[0]._id}, con ${reservasPorFecha[0].totalReservas} reservas.`
    );
  }

  productosBajoStock.forEach((producto) => {
    recomendaciones.push(
      `Se recomienda reabastecer ${producto.nombre}, ya que está por debajo del nivel mínimo.`
    );
  });

  if (recomendaciones.length === 0) {
    recomendaciones.push(
      'No hay suficiente información histórica para generar recomendaciones avanzadas.'
    );
  }

  return {
    productosMasConsumidos,
    reservasPorFecha,
    productosBajoStock,
    recomendaciones
  };
};

module.exports = {
  obtenerAnalisisDemanda
};