import { useNavigate } from 'react-router-dom';
import '../../Dashboard.css';
import Header from '../../components/Header/Header';

const MODULOS = [
  { icono: '📅', nombre: 'Reservas', descripcion: 'Gestión de mesas', ruta: '/reservas' },
  { icono: '📦', nombre: 'Inventario', descripcion: 'Control de stock', ruta: '/inventario' },
  { icono: '🧠', nombre: 'Análisis IA', descripcion: 'Predicción de demanda', ruta: '/analisis' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const iniciales = usuario?.nombre
    ? usuario.nombre.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/');
  };

  return (
    <>
    <Header />
    <div className="dashboard-page">
      <main className="dashboard-main">
        <div className="dashboard-welcome">
          <h1>Bienvenido, {usuario?.nombre ?? 'Usuario'}</h1>
          <p>Dashboard principal</p>
        </div>

        <div className="dashboard-modulos">
          {MODULOS.map((m) => (
            <div key={m.nombre} className="modulo-card" onClick={() => navigate(m.ruta)}>
              <span className="modulo-icono">{m.icono}</span>
              <p className="modulo-nombre">{m.nombre}</p>
              <p className="modulo-desc">{m.descripcion}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
    </>
  );
};

export default Dashboard;