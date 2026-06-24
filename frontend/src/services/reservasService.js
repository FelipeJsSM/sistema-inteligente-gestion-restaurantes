import api from './api';

export const obtenerReservas = async () => {
  const respuesta = await api.get('/reservas');
  return respuesta.data;
};

export const crearReserva = async (datosReserva) => {
  const respuesta = await api.post('/reservas', datosReserva);
  return respuesta.data;
};

export const cancelarReserva = async (id) => {
  const respuesta = await api.patch(`/reservas/${id}/cancelar`);
  return respuesta.data;
};