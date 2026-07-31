import api from './api';

export const obtenerAnalisis = async () => {
  const respuesta = await api.get('/analisis-demanda');
  return respuesta.data;
};