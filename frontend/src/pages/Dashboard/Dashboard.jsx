import { useNavigate } from 'react-router-dom';
import '../../Dashboard.css';

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
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <span className="dashboard-brand-icon">🍽️</span>
          <span className="dashboard-brand-name">SIGR</span>
        </div>
        <div className="dashboard-header-right">
          <div className="dashboard-avatar">{iniciales}</div>
          <button className="btn-cerrar-sesion" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </header>

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
  );
};

export default Dashboard;