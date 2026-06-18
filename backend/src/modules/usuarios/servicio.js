const bcrypt = require('bcryptjs');
const Usuario = require('./modelo');

const crearUsuario = async (datos) => {
  const usuarioExiste = await Usuario.findOne({ correo: datos.correo });

  if (usuarioExiste) {
    throw new Error('Ya existe un usuario con este correo');
  }

  const claveEncriptada = await bcrypt.hash(datos.clave, 10);

  const usuario = await Usuario.create({
    nombre: datos.nombre,
    apellido: datos.apellido,
    correo: datos.correo,
    clave: claveEncriptada,
    rol: datos.rol
  });

  return usuario;
};

const obtenerUsuarios = async () => {
  return await Usuario.find().select('-clave');
};

const obtenerUsuarioPorId = async (id) => {
  const usuario = await Usuario.findById(id).select('-clave');

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  return usuario;
};

const actualizarUsuario = async (id, datos) => {
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    datos,
    { new: true }
  ).select('-clave');

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  return usuario;
};

const eliminarUsuario = async (id) => {
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { activo: false },
    { new: true }
  ).select('-clave');

  if (!usuario) {
    throw new Error('Usuario no encontrado');
  }

  return usuario;
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};