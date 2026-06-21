import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesion } from '../../services/authService';
import '../../Login.css';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const respuesta = await iniciarSesion(correo, clave);
      localStorage.setItem('token', respuesta.token);
      localStorage.setItem('usuario', JSON.stringify(respuesta.usuario));
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-icon">🍽️</span>
        </div>
        <p className="login-subtitle">Sistema Inteligente de Gestión de</p>
        <h1 className="login-title">Restaurantes</h1>

        <form onSubmit={manejarEnvio} className="login-form">
          <div className="field-group">
            <label className="field-label">Correo electrónico</label>
            <div className="field-input-wrapper">
              <span className="field-icon">✉️</span>
              <input
                type="email"
                className="field-input"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
                placeholder="ejemplo@restosmart.com"
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Contraseña</label>
            <div className="field-input-wrapper">
              <span className="field-icon">🔒</span>
              <input
                type="password"
                className="field-input"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn" disabled={cargando}>
            {cargando ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;