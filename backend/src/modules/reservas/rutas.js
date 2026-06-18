const express = require('express');
const controlador = require('./controlador');
const { verificarToken } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verificarToken, controlador.crearReserva);
router.get('/', verificarToken, controlador.obtenerReservas);
router.get('/:id', verificarToken, controlador.obtenerReservaPorId);
router.put('/:id', verificarToken, controlador.actualizarReserva);
router.patch('/:id/cancelar', verificarToken, controlador.cancelarReserva);

module.exports = router;