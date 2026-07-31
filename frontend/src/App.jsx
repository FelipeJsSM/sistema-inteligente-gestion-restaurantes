import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Inventario from './pages/Inventario/Inventario';
import Dashboard from './pages/Dashboard/Dashboard';
import Reservas from './pages/Reservas/Reservas';
import Analisis from './pages/Analisis/Analisis';
import Usuarios from './pages/Usuarios/Usuarios';

const ROLES = {
  ADMINISTRADOR: 'Administrador',
  ENCARGADO_OPERACIONES: 'Encargado de Operaciones',
  PERSONAL_INVENTARIO: 'Personal de Inventario',
  PERSONAL_SERVICIO: 'Personal de Servicio'
};

const RutaPrivada = ({ children, rolesPermitidos }) => {
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!token) {
    return <Navigate to="/" />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario?.rol)) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/dashboard" element={<RutaPrivada><Dashboard /></RutaPrivada>} />

        <Route
          path="/inventario"
          element={
            <RutaPrivada rolesPermitidos={[
              ROLES.ADMINISTRADOR,
              ROLES.ENCARGADO_OPERACIONES,
              ROLES.PERSONAL_INVENTARIO
            ]}>
              <Inventario />
            </RutaPrivada>
          }
        />

        <Route 
          path="/analisis" 
          element={ 
            <RutaPrivada rolesPermitidos={[
              ROLES.ADMINISTRADOR,
              ROLES.ENCARGADO_OPERACIONES,
              ROLES.PERSONAL_INVENTARIO
            ]}>
              <Analisis />
            </RutaPrivada> 
          } 
        />

        <Route
          path="/reservas"
          element={
            <RutaPrivada rolesPermitidos={[
              ROLES.ADMINISTRADOR,
              ROLES.ENCARGADO_OPERACIONES,
              ROLES.PERSONAL_SERVICIO
            ]}>
              <Reservas />
            </RutaPrivada>
          }
        />

        <Route
          path="/usuarios"
          element={
            <RutaPrivada rolesPermitidos={[
              ROLES.ADMINISTRADOR
            ]}>
              <Usuarios />
            </RutaPrivada>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
