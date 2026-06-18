const inventarioServicio = require('./servicio');

const crearProducto = async (req, res) => {
  try {
    const producto = await inventarioServicio.crearProducto(req.body);

    res.status(201).json({
      mensaje: 'Producto creado correctamente',
      producto
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await inventarioServicio.obtenerProductos();

    res.json({
      mensaje: 'Productos obtenidos correctamente',
      productos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const producto = await inventarioServicio.obtenerProductoPorId(req.params.id);

    res.json({
      mensaje: 'Producto obtenido correctamente',
      producto
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const producto = await inventarioServicio.actualizarProducto(req.params.id, req.body);

    res.json({
      mensaje: 'Producto actualizado correctamente',
      producto
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const registrarEntrada = async (req, res) => {
  try {
    const producto = await inventarioServicio.registrarEntrada(
      req.params.id,
      Number(req.body.cantidad)
    );

    res.json({
      mensaje: 'Entrada de inventario registrada correctamente',
      producto
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const registrarSalida = async (req, res) => {
  try {
    const producto = await inventarioServicio.registrarSalida(
      req.params.id,
      Number(req.body.cantidad)
    );

    res.json({
      mensaje: 'Salida de inventario registrada correctamente',
      producto
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const obtenerProductosBajoStock = async (req, res) => {
  try {
    const productos = await inventarioServicio.obtenerProductosBajoStock();

    res.json({
      mensaje: 'Productos con bajo inventario obtenidos correctamente',
      productos
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const producto = await inventarioServicio.eliminarProducto(req.params.id);

    res.json({
      mensaje: 'Producto desactivado correctamente',
      producto
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  registrarEntrada,
  registrarSalida,
  obtenerProductosBajoStock,
  eliminarProducto
};