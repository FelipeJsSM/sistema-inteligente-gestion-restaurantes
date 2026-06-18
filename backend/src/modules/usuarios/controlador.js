const usuarioServicio = require('./servicio');

const crearUsuario = async (req, res) => {
  try {
    const usuario = await usuarioServicio.crearUsuario(req.body);

    res.status(201).json({
      mensaje: 'Usuario creado correctamente',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioServicio.obtenerUsuarios();

    res.json({
      mensaje: 'Usuarios obtenidos correctamente',
      usuarios
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioServicio.obtenerUsuarioPorId(req.params.id);

    res.json({
      mensaje: 'Usuario obtenido correctamente',
      usuario
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioServicio.actualizarUsuario(req.params.id, req.body);

    res.json({
      mensaje: 'Usuario actualizado correctamente',
      usuario
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await usuarioServicio.eliminarUsuario(req.params.id);

    res.json({
      mensaje: 'Usuario desactivado correctamente',
      usuario
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};