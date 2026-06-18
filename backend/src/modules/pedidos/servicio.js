const Pedido = require('./modelo');

const crearPedido = async (datos) => {
  if (!datos.productos || datos.productos.length === 0) {
    throw new Error('El pedido debe tener al menos un producto');
  }

  const productosConSubtotal = datos.productos.map((producto) => {
    const subtotal = producto.cantidad * producto.precioUnitario;

    return {
      nombreProducto: producto.nombreProducto,
      cantidad: producto.cantidad,
      precioUnitario: producto.precioUnitario,
      subtotal
    };
  });

  const total = productosConSubtotal.reduce((acumulador, producto) => {
    return acumulador + producto.subtotal;
  }, 0);

  const pedido = await Pedido.create({
    cliente: datos.cliente,
    mesa: datos.mesa,
    productos: productosConSubtotal,
    total,
    estado: datos.estado || 'Pendiente',
    metodoPago: datos.metodoPago || 'Pendiente',
    observaciones: datos.observaciones
  });

  return pedido;
};

const obtenerPedidos = async () => {
  return await Pedido.find().sort({ createdAt: -1 });
};

const obtenerPedidoPorId = async (id) => {
  const pedido = await Pedido.findById(id);

  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  return pedido;
};

const actualizarEstadoPedido = async (id, estado) => {
  const estadosPermitidos = ['Pendiente', 'En preparación', 'Servido', 'Cancelado', 'Pagado'];

  if (!estadosPermitidos.includes(estado)) {
    throw new Error('Estado de pedido no válido');
  }

  const pedido = await Pedido.findByIdAndUpdate(
    id,
    { estado },
    { new: true }
  );

  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  return pedido;
};

const cancelarPedido = async (id) => {
  const pedido = await Pedido.findByIdAndUpdate(
    id,
    { estado: 'Cancelado' },
    { new: true }
  );

  if (!pedido) {
    throw new Error('Pedido no encontrado');
  }

  return pedido;
};

const obtenerProductosMasConsumidos = async () => {
  return await Pedido.aggregate([
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
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarEstadoPedido,
  cancelarPedido,
  obtenerProductosMasConsumidos
};