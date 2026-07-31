import { useState, useEffect } from 'react';
import { obtenerUsuarios, crearUsuario } from '../../services/usuariosService';
import '../../Dashboard.css';
import Header from '../../components/Header/Header';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    correo: '',
    clave: '',
    rol: 'Personal de Servicio',
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const data = await obtenerUsuarios();
      if (Array.isArray(data)) setUsuarios(data);
      else if (data && data.usuarios) setUsuarios(data.usuarios);
      else setUsuarios([]);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  };

  const manejarCreacion = async (e) => {
    e.preventDefault();
    try {
      await crearUsuario(nuevoUsuario);
      setNuevoUsuario({ nombre: '', correo: '', clave: '', rol: 'Personal de Servicio' });
      cargarDatos();
    } catch (error) {
      alert('Error al crear usuario. Verifica que tienes permisos de Administrador.');
    }
  };

  return (
    <>
      <Header />
      <div className="usuarios-page">
        <h1 className="usuarios-title">Gestión de usuarios</h1>

        <div className="usuarios-card">
          <p className="usuarios-card-label">Registrar nuevo empleado</p>
          <form className="usuarios-form" onSubmit={manejarCreacion}>
            <input
              className="usuarios-input"
              type="text"
              placeholder="Nombre completo"
              value={nuevoUsuario.nombre}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
              required
            />
            <input
              className="usuarios-input"
              type="email"
              placeholder="Correo electrónico"
              value={nuevoUsuario.correo}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, correo: e.target.value })}
              required
            />
            <input
              className="usuarios-input"
              type="password"
              placeholder="Contraseña temporal"
              value={nuevoUsuario.clave}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, clave: e.target.value })}
              required
            />
            <select
              className="usuarios-input"
              value={nuevoUsuario.rol}
              onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, rol: e.target.value })}
              required
            >
              <option value="Administrador">Administrador</option>
              <option value="Encargado de Operaciones">Encargado de Operaciones</option>
              <option value="Personal de Inventario">Personal de Inventario</option>
              <option value="Personal de Servicio">Personal de Servicio</option>
            </select>
            <button className="usuarios-btn" type="submit">
              Crear usuario
            </button>
          </form>
        </div>

        <div className="usuarios-card">
          <p className="usuarios-card-label">Empleados registrados</p>
          <div className="usuarios-table-wrap">
            <table className="usuarios-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td className="usuarios-empty" colSpan={4}>
                      No hay usuarios registrados.
                    </td>
                  </tr>
                ) : (
                  usuarios.map((usr) => (
                    <tr key={usr._id}>
                      <td>{usr.nombre}</td>
                      <td>{usr.correo}</td>
                      <td>
                        <span className="usuarios-rol">{usr.rol}</span>
                      </td>
                      <td>
                        <span
                          className={`usuarios-estado ${
                            usr.activo !== false ? 'usuarios-estado--activo' : 'usuarios-estado--inactivo'
                          }`}
                        >
                          {usr.activo !== false ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Usuarios;