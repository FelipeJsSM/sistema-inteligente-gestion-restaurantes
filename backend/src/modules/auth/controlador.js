const authServicio = require('./servicio');

const iniciarSesion = async (req, res) => {
  try {
    const { correo, clave } = req.body;

    if (!correo || !clave) {
      return res.status(400).json({
        mensaje: 'El correo y la clave son obligatorios'
      });
    }

    const resultado = await authServicio.iniciarSesion(correo, clave);

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token: resultado.token,
      usuario: resultado.usuario
    });
  } catch (error) {
    if (error.message === 'JWT_SECRET no esta configurado') {
      return res.status(500).json({
        mensaje: 'Error de configuracion de autenticacion'
      });
    }

    res.status(401).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  iniciarSesion
};
