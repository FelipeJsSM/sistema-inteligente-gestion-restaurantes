const express = require('express');
const controlador = require('./controlador');

const router = express.Router();

router.post('/login', controlador.iniciarSesion);

module.exports = router;