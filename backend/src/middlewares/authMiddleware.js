const jwt = require('jsonwebtoken');

const obtenerJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET no esta configurado');
  }

  return process.env.JWT_SECRET;
};

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      mensaje: 'Token no proporcionado'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const usuario = jwt.verify(token, obtenerJwtSecret());

    if (!usuario.id || !usuario.rol) {
      return res.status(401).json({
        mensaje: 'Token invalido'
      });
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    if (error.message === 'JWT_SECRET no esta configurado') {
      return res.status(500).json({
        mensaje: 'Error de configuracion de autenticacion'
      });
    }

    return res.status(401).json({
      mensaje: 'Token invalido o expirado'
    });
  }
};

const permitirRoles = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({
        mensaje: 'Usuario no autenticado'
      });
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({
        mensaje: 'No tiene permiso para realizar esta accion'
      });
    }

    next();
  };
};

module.exports = {
  verificarToken,
  permitirRoles
};
