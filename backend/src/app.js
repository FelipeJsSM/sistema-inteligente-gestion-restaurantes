const express = require('express');
const cors = require('cors');

const rutasUsuarios = require('./modules/usuarios/rutas');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API del Sistema Inteligente de Restaurantes funcionando'
  });
});

app.use('/api/usuarios', rutasUsuarios);

module.exports = app;