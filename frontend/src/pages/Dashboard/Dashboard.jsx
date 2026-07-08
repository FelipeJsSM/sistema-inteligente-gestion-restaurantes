import { useNavigate } from 'react-router-dom';
import '../../Dashboard.css';
import Header from '../../components/Header/Header';

const ROLES = {
  ADMINISTRADOR: 'Administrador',
  ENCARGADO_OPERACIONES: 'Encargado de Operaciones',
  PERSONAL_INVENTARIO: 'Personal de Inventario',
  PERSONAL_SERVICIO: 'Personal de Servicio'
};

const MODULOS = [
  {
    icono: 'R',
    nombre: 'Reservas',
    descripcion: 'Gestion de mesas',
    ruta: '/reservas',
    roles: [ROLES.ADMINISTRADOR, ROLES.ENCARGADO_OPERACIONES, ROLES.PERSONAL_SERVICIO]
  },
  {
    icono: 'I',
    nombre: 'Inventario',
    descripcion: 'Control de stock',
    ruta: '/inventario',
    roles: [ROLES.ADMINISTRADOR, ROLES.ENCARGADO_OPERACIONES, ROLES.PERSONAL_INVENTARIO]
  },
  {
    icono: 'IA',
    nombre: 'Analisis IA',
    descripcion: 'Prediccion de demanda',
    ruta: '/analisis',
    roles: [ROLES.ADMINISTRADOR, ROLES.ENCARGADO_OPERACIONES]
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const modulosPermitidos = MODULOS.filter((modulo) => modulo.roles.includes(usuario?.rol));

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
            {modulosPermitidos.map((m) => (
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
