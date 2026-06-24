import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Inventario from './pages/Inventario/Inventario';
import Dashboard from './pages/Dashboard/Dashboard';
import Reservas from './pages/Reservas/Reservas';

const RutaPrivada = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="/dashboard" element={<RutaPrivada><Dashboard /></RutaPrivada>} />

        <Route path="/inventario" element={ <RutaPrivada><Inventario /></RutaPrivada> } />

        <Route path="/reservas" element={ <RutaPrivada><Reservas /></RutaPrivada> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;