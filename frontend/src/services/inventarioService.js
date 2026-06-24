import api from './api';

export const obtenerInventario = async () => {
  const respuesta = await api.get('/inventario');
  return respuesta.data;
};

export const crearProducto = async (datosProducto) => {
  const respuesta = await api.post('/inventario', datosProducto);
  return respuesta.data;
};

export const registrarEntrada = async (id, cantidad) => {
  const respuesta = await api.patch(`/inventario/${id}/entrada`, { cantidad });
  return respuesta.data;
};