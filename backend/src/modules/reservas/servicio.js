const Reserva = require('./modelo');

const crearReserva = async (datos) => {
  const reservaExistente = await Reserva.findOne({
    fecha: datos.fecha,
    hora: datos.hora,
    mesaAsignada: datos.mesaAsignada,
    estado: { $ne: 'Cancelada' }
  });

  if (reservaExistente) {
    throw new Error('La mesa ya está reservada para esa fecha y hora');
  }

  const reserva = await Reserva.create(datos);
  return reserva;
};

const obtenerReservas = async () => {
  return await Reserva.find().sort({ createdAt: -1 });
};

const obtenerReservaPorId = async (id) => {
  const reserva = await Reserva.findById(id);

  if (!reserva) {
    throw new Error('Reserva no encontrada');
  }

  return reserva;
};

const actualizarReserva = async (id, datos) => {
  const reserva = await Reserva.findByIdAndUpdate(
    id,
    datos,
    { new: true }
  );

  if (!reserva) {
    throw new Error('Reserva no encontrada');
  }

  return reserva;
};

const cancelarReserva = async (id) => {
  const reserva = await Reserva.findByIdAndUpdate(
    id,
    { estado: 'Cancelada' },
    { new: true }
  );

  if (!reserva) {
    throw new Error('Reserva no encontrada');
  }

  return reserva;
};

module.exports = {
  crearReserva,
  obtenerReservas,
  obtenerReservaPorId,
  actualizarReserva,
  cancelarReserva
};