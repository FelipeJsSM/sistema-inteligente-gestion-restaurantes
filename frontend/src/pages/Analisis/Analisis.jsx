import { useState, useEffect } from 'react';
import { obtenerAnalisis } from '../../services/analisisService';
import '../../Dashboard.css';
import Header from '../../components/Header/Header';

const Analisis = () => {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => { cargarAnalisis(); }, []);

  const cargarAnalisis = async () => {
    try {
      const data = await obtenerAnalisis();
      setDatos(data.analisis || data.data || data);
    } catch (error) {
      console.error('Error cargando análisis:', error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <>
        <Header />
        <div className="analisis-page">
          <div className="analisis-loading">Procesando datos con IA...</div>
        </div>
      </>
    );
  }

  const bajoStock = datos?.productosBajoStock ?? [];
  const reservas = datos?.reservasPorFecha ?? [];

  return (
    <>
      <Header />
      <div className="analisis-page">
        <h1 className="analisis-title">Análisis inteligente de demanda</h1>

        <div className="analisis-card analisis-card--destacada">
          <p className="analisis-card-label">Recomendaciones estratégicas (generadas por IA)</p>
          <div className="analisis-reco">
            {datos?.recomendaciones || 'No hay recomendaciones disponibles en este momento.'}
          </div>
        </div>

        <div className="analisis-grid">
          <div className="analisis-card">
            <p className="analisis-card-label">Alertas de inventario</p>
            {bajoStock.length === 0 ? (
              <p className="analisis-empty">El inventario está estable.</p>
            ) : (
              <ul className="analisis-list">
                {bajoStock.map((prod, i) => (
                  <li key={i}>
                    <span className="analisis-badge analisis-badge--low">⚠</span>
                    <strong>{prod.nombre}</strong>: quedan {prod.cantidadDisponible} (mínimo: {prod.nivelMinimo})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="analisis-card">
            <p className="analisis-card-label">Top fechas de reservas</p>
            {reservas.length === 0 ? (
              <p className="analisis-empty">Sin reservas registradas.</p>
            ) : (
              <ul className="analisis-list">
                {reservas.map((res, i) => (
                  <li key={i}>
                    <strong>{new Date(res._id).toLocaleDateString()}</strong> — {res.totalReservas} reservas ({res.totalPersonas} personas)
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Analisis;