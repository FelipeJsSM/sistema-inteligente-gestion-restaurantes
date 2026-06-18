const express = require('express');
const controlador = require('./controlador');
const { verificarToken } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/', verificarToken, controlador.obtenerResumenDashboard);

module.exports = router;