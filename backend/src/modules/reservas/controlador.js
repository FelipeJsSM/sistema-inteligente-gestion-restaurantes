const reservaServicio = require('./servicio');

const crearReserva = async (req, res) => {
  try {
    const reserva = await reservaServicio.crearReserva(req.body);

    res.status(201).json({
      mensaje: 'Reserva creada correctamente',
      reserva
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const obtenerReservas = async (req, res) => {
  try {
    const reservas = await reservaServicio.obtenerReservas();

    res.json({
      mensaje: 'Reservas obtenidas correctamente',
      reservas
    });
  } catch (error) {
    res.status(500).json({
      mensaje: error.message
    });
  }
};

const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await reservaServicio.obtenerReservaPorId(req.params.id);

    res.json({
      mensaje: 'Reserva obtenida correctamente',
      reserva
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }
};

const actualizarReserva = async (req, res) => {
  try {
    const reserva = await reservaServicio.actualizarReserva(req.params.id, req.body);

    res.json({
      mensaje: 'Reserva actualizada correctamente',
      reserva
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message
    });
  }
};

const cancelarReserva = async (req, res) => {
  try {
    const reserva = await reservaServicio.cancelarReserva(req.params.id);

    res.json({
      mensaje: 'Reserva cancelada correctamente',
      reserva
    });
  } catch (error) {
    res.status(404).json({
      mensaje: error.message
    });
  }
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  cancelarReserva
};