const analisisDemandaServicio = require('./servicio');

const obtenerAnalisisDemanda = async (req, res) => {
  try {
    const analisis = await analisisDemandaServicio.obtenerAnalisisDemanda();

    res.json({
      mensaje: 'Análisis inteligente de demanda obtenido correctamente',
      analisis
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  obtenerAnalisisDemanda
};