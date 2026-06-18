const dashboardServicio = require('./servicio');

const obtenerResumenDashboard = async (req, res) => {
  try {
    const resumen = await dashboardServicio.obtenerResumenDashboard();

    res.json({
      mensaje: 'Resumen del dashboard obtenido correctamente',
      resumen
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  obtenerResumenDashboard
};