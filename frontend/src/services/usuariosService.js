import api from './api';

export const obtenerUsuarios = async () => {
  const respuesta = await api.get('/usuarios');
  return respuesta.data;
};

export const crearUsuario = async (datosUsuario) => {
  const respuesta = await api.post('/usuarios', datosUsuario);
  return respuesta.data;
};