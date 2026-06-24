import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
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
    <header className="dashboard-header">
      <div className="dashboard-brand" onClick={() => navigate('/dashboard')}>
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
  );
};

export default Header;