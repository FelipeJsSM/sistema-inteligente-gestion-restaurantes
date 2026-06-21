import axios from 'axios';

const API_URL = 'http://localhost:4000/api/auth'; 

export const iniciarSesion = async (correo, clave) => {
  try {
    const respuesta = await axios.post(`${API_URL}/login`, {
      correo,
      clave
    });
    return respuesta.data;
  } catch (error) {
    // Manejo de errores para capturar el mensaje del backend
    if (error.response && error.response.data) {
      throw new Error(error.response.data.mensaje);
    }
    throw new Error('Error al conectar con el servidor');
  }
};