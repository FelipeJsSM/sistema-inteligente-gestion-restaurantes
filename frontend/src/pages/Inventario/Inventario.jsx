import { useState, useEffect } from 'react';
import { obtenerInventario, crearProducto, registrarEntrada } from '../../services/inventarioService';
import '../../Inventario.css';
import Header from '../../components/Header/Header';

const UNIDADES = ['Unidad', 'Libra', 'Kilogramo', 'Litro', 'Galón', 'Paquete'];

const FORM_INICIAL = {
  nombre: '', categoria: '', unidadMedida: 'Unidad',
  cantidadDisponible: 0, nivelMinimo: 5, proveedor: ''
};

const Inventario = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState(FORM_INICIAL);

  useEffect(() => { cargarDatos(); }, []);

  const cargarDatos = async () => {
    try {
      const data = await obtenerInventario();
      if (Array.isArray(data)) setProductos(data);
      else if (data?.productos) setProductos(data.productos);
      else if (data?.data) setProductos(data.data);
      else setProductos([]);
    } catch (error) {
      console.error('Error al cargar inventario:', error);
      setProductos([]);
    }
  };

  const set = (campo) => (e) =>
    setNuevoProducto((prev) => ({ ...prev, [campo]: e.target.value }));

  const manejarCreacion = async (e) => {
    e.preventDefault();
    try {
      await crearProducto(nuevoProducto);
      setNuevoProducto(FORM_INICIAL);
      cargarDatos();
    } catch {
      alert('Error al crear producto. Revisa los datos.');
    }
  };

  const agregarStock = async (id) => {
    const cantidad = prompt('¿Cuántas unidades deseas agregar al stock?');
    if (cantidad && !isNaN(cantidad)) {
      try {
        await registrarEntrada(id, Number(cantidad));
        cargarDatos();
      } catch {
        alert('Error al actualizar stock');
      }
    }
  };

  return (
    <>
    <Header />
    <div className="inv-page">
      <h1 className="inv-title">Gestión de inventario</h1>

      <div className="inv-card">
        <p className="inv-card-label">Agregar nuevo producto</p>
        <form onSubmit={manejarCreacion}>
          <div className="inv-form-grid">
            <input type="text" placeholder="Nombre (ej. Tomate)" value={nuevoProducto.nombre} onChange={set('nombre')} required />
            <input type="text" placeholder="Categoría (ej. Vegetales)" value={nuevoProducto.categoria} onChange={set('categoria')} required />
            <select value={nuevoProducto.unidadMedida} onChange={set('unidadMedida')} required>
              {UNIDADES.map((u) => <option key={u}>{u}</option>)}
            </select>
            <input type="number" placeholder="Cantidad disponible" value={nuevoProducto.cantidadDisponible} onChange={set('cantidadDisponible')} required min="0" />
            <input type="number" placeholder="Stock mínimo" value={nuevoProducto.nivelMinimo} onChange={set('nivelMinimo')} required min="0" />
            <input type="text" placeholder="Proveedor (opcional)" value={nuevoProducto.proveedor} onChange={set('proveedor')} />
          </div>
          <button type="submit" className="btn-guardar">Guardar producto</button>
        </form>
      </div>

      <div className="inv-card">
        <p className="inv-card-label">Productos en inventario</p>
        <div className="inv-table-wrapper">
          <table className="inv-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock actual</th>
                <th>Proveedor</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="inv-empty">No hay productos registrados.</td>
                </tr>
              ) : productos.map((prod) => {
                const bajo = prod.cantidadDisponible <= prod.nivelMinimo;
                return (
                  <tr key={prod._id}>
                    <td>{prod.nombre}</td>
                    <td>{prod.categoria}</td>
                    <td>
                      <span className={`inv-badge ${bajo ? 'inv-badge--low' : 'inv-badge--ok'}`}>
                        {bajo ? '⚠ ' : '✓ '}
                        {prod.cantidadDisponible} {prod.unidadMedida}
                      </span>
                    </td>
                    <td>{prod.proveedor || 'N/A'}</td>
                    <td>
                      <button className="btn-entrada" onClick={() => agregarStock(prod._id)}>
                        + Entrada
                      </button>
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

export default Inventario;