const Inventario = require('./modelo');

const crearProducto = async (datos) => {
  const productoExiste = await Inventario.findOne({
    nombre: datos.nombre,
    activo: true
  });

  if (productoExiste) {
    throw new Error('Ya existe un producto con este nombre');
  }

  return await Inventario.create(datos);
};

const obtenerProductos = async () => {
  return await Inventario.find({ activo: true }).sort({ createdAt: -1 });
};

const obtenerProductoPorId = async (id) => {
  const producto = await Inventario.findById(id);

  if (!producto || !producto.activo) {
    throw new Error('Producto no encontrado');
  }

  return producto;
};

const actualizarProducto = async (id, datos) => {
  const producto = await Inventario.findByIdAndUpdate(
    id,
    datos,
    { new: true }
  );

  if (!producto || !producto.activo) {
    throw new Error('Producto no encontrado');
  }

  return producto;
};

const registrarEntrada = async (id, cantidad) => {
  if (cantidad <= 0) {
    throw new Error('La cantidad de entrada debe ser mayor que cero');
  }

  const producto = await Inventario.findById(id);

  if (!producto || !producto.activo) {
    throw new Error('Producto no encontrado');
  }

  producto.cantidadDisponible += cantidad;
  await producto.save();

  return producto;
};

const registrarSalida = async (id, cantidad) => {
  if (cantidad <= 0) {
    throw new Error('La cantidad de salida debe ser mayor que cero');
  }

  const producto = await Inventario.findById(id);

  if (!producto || !producto.activo) {
    throw new Error('Producto no encontrado');
  }

  if (producto.cantidadDisponible < cantidad) {
    throw new Error('No hay suficiente inventario disponible');
  }

  producto.cantidadDisponible -= cantidad;
  await producto.save();

  return producto;
};

const obtenerProductosBajoStock = async () => {
  return await Inventario.find({
    activo: true,
    $expr: {
      $lte: ['$cantidadDisponible', '$nivelMinimo']
    }
  });
};

const eliminarProducto = async (id) => {
  const producto = await Inventario.findByIdAndUpdate(
    id,
    { activo: false },
    { new: true }
  );

  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  return producto;
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