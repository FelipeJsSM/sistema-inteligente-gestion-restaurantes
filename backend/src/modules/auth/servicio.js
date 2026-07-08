const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../usuarios/modelo');

const obtenerJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no esta configurado');
  }

  return process.env.JWT_SECRET;
};

const iniciarSesion = async (correo, clave) => {
  const usuario = await Usuario.findOne({ correo });

  if (!usuario) {
    throw new Error('Credenciales incorrectas');
  }

  if (!usuario.activo) {
    throw new Error('El usuario se encuentra inactivo');
  }

  const claveValida = await bcrypt.compare(clave, usuario.clave);

  if (!claveValida) {
    throw new Error('Credenciales incorrectas');
  }

  const token = jwt.sign(
    {
      id: usuario._id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    },
    obtenerJwtSecret(),
    {
      expiresIn: '2h'
    }
  );

  return {
    token,
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
};

module.exports = {
  iniciarSesion
};
