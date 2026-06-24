import { useState, useEffect } from 'react';
import { obtenerReservas, crearReserva, cancelarReserva } from '../../services/reservasService';
import Header from '../../components/Header/Header';
import '../../Reservas.css';

const FORM_INICIAL = {
  nombreCliente: '', telefonoCliente: '', fecha: '',
  hora: '', cantidadPersonas: 2, mesaAsignada: 1, observaciones: ''
};

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [nuevaReserva, setNuevaReserva] = useState(FORM_INICIAL);

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    try {
      const data = await obtenerReservas();
      if (Array.isArray(data)) setReservas(data);
      else if (data?.reservas) setReservas(data.reservas);
      else if (data?.data) setReservas(data.data);
      else setReservas([]);
    } catch (error) {
      console.error('Error al cargar reservas:', error);
      setReservas([]);
    }
  };

  const set = (campo) => (e) =>
    setNuevaReserva((prev) => ({ ...prev, [campo]: e.target.value }));

  const manejarCreacion = async (e) => {
    e.preventDefault();
    try {
      await crearReserva(nuevaReserva);
      setNuevaReserva(FORM_INICIAL);
      cargarDatos();
    } catch {
      alert('Error al crear la reserva. Revisa los datos.');
    }
  };

  const manejarCancelacion = async (id) => {
    if (window.confirm('¿Estás seguro de cancelar esta reserva?')) {
      try {
        await cancelarReserva(id);
        cargarDatos();
      } catch {
        alert('Error al cancelar la reserva');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="res-page">
        <h1 className="res-title">Gestión de reservas</h1>

        <div className="res-card">
          <p className="res-card-label">Registrar nueva reserva</p>
          <form onSubmit={manejarCreacion}>
            <div className="res-form-grid">
              <input type="text" placeholder="Nombre del cliente" value={nuevaReserva.nombreCliente} onChange={set('nombreCliente')} required />
              <input type="text" placeholder="Teléfono" value={nuevaReserva.telefonoCliente} onChange={set('telefonoCliente')} required />
              <input type="date" value={nuevaReserva.fecha} onChange={set('fecha')} required />
              <input type="time" value={nuevaReserva.hora} onChange={set('hora')} required />
              <input type="number" placeholder="Personas" value={nuevaReserva.cantidadPersonas} onChange={set('cantidadPersonas')} required min="1" />
              <input type="number" placeholder="Mesa" value={nuevaReserva.mesaAsignada} onChange={set('mesaAsignada')} required min="1" />
              <input type="text" placeholder="Observaciones (opcional)" value={nuevaReserva.observaciones} onChange={set('observaciones')} className="res-form-full" />
            </div>
            <button type="submit" className="btn-guardar">Guardar reserva</button>
          </form>
        </div>

        <div className="res-card">
          <p className="res-card-label">Reservas registradas</p>
          <div className="res-table-wrapper">
            <table className="res-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Teléfono</th>
                  <th>Fecha / hora</th>
                  <th>Personas / mesa</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {reservas.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="res-empty">No hay reservas registradas.</td>
                  </tr>
                ) : reservas.map((res) => {
                  const cancelada = res.estado === 'Cancelada';
                  return (
                    <tr key={res._id}>
                      <td>{res.nombreCliente}</td>
                      <td>{res.telefonoCliente}</td>
                      <td>
                        {new Date(res.fecha).toLocaleDateString('es-DO', { timeZone: 'UTC' })}
                        <div className="res-meta">{res.hora}</div>
                      </td>
                      <td>{res.cantidadPersonas} pers. / Mesa {res.mesaAsignada}</td>
                      <td>
                        <span className={`res-badge ${cancelada ? 'res-badge--cancel' : 'res-badge--ok'}`}>
                          {cancelada ? 'Cancelada' : (res.estado ?? 'Confirmada')}
                        </span>
                      </td>
                      <td>
                        {!cancelada && (
                          <button className="btn-cancelar" onClick={() => manejarCancelacion(res._id)}>
                            Cancelar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reservas;