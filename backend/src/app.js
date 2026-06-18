const express = require('express');
const cors = require('cors');

const rutasAuth = require('./modules/auth/rutas');
const rutasUsuarios = require('./modules/usuarios/rutas');
const rutasReservas = require('./modules/reservas/rutas');
const rutasInventario = require('./modules/inventario/rutas');
const rutasPedidos = require('./modules/pedidos/rutas');
const rutasDashboard = require('./modules/dashboard/rutas');
const rutasAnalisisDemanda = require('./modules/analisisDemanda/rutas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API del Sistema Inteligente de Restaurantes funcionando'
  });
});

app.use('/api/auth', rutasAuth);
app.use('/api/usuarios', rutasUsuarios);
app.use('/api/reservas', rutasReservas);
app.use('/api/inventario', rutasInventario);
app.use('/api/pedidos', rutasPedidos);
app.use('/api/dashboard', rutasDashboard);
app.use('/api/analisis-demanda', rutasAnalisisDemanda);

module.exports = app;