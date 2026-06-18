const pedidoServicio = require('./servicio');

const crearPedido = async (req, res) => {
  try {
    const pedido = await pedidoServicio.crearPedido(req.body);

    res.status(201).json({
      mensaje: 'Pedido creado correctamente',
      pedido
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const obtenerPedidos = async (req, res) => {
  try {
    const pedidos = await pedidoServicio.obtenerPedidos();

    res.json({
      mensaje: 'Pedidos obtenidos correctamente',
      pedidos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

const obtenerPedidoPorId = async (req, res) => {
  try {
    const pedido = await pedidoServicio.obtenerPedidoPorId(req.params.id);

    res.json({
      mensaje: 'Pedido obtenido correctamente',
      pedido
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }
};

const actualizarEstadoPedido = async (req, res) => {
  try {
    const pedido = await pedidoServicio.actualizarEstadoPedido(
      req.params.id,
      req.body.estado
    );

    res.json({
      mensaje: 'Estado del pedido actualizado correctamente',
      pedido
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const cancelarPedido = async (req, res) => {
  try {
    const pedido = await pedidoServicio.cancelarPedido(req.params.id);

    res.json({
      mensaje: 'Pedido cancelado correctamente',
      pedido
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }
};

const obtenerProductosMasConsumidos = async (req, res) => {
  try {
    const productos = await pedidoServicio.obtenerProductosMasConsumidos();

    res.json({
      mensaje: 'Productos más consumidos obtenidos correctamente',
      productos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  crearPedido,
  obtenerPedidos,
  obtenerPedidoPorId,
  actualizarEstadoPedido,
  cancelarPedido,
  obtenerProductosMasConsumidos
};