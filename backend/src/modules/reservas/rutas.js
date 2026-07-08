const express = require('express');
const controlador = require('./controlador');
const { verificarToken, permitirRoles } = require('../../middlewares/authMiddleware');
const { ROLES } = require('../../config/roles');

const router = express.Router();

const accesoReservas = permitirRoles(
  ROLES.ADMINISTRADOR,
  ROLES.ENCARGADO_OPERACIONES,
  ROLES.PERSONAL_SERVICIO
);

router.use(verificarToken);
router.use(accesoReservas);

router.post('/', controlador.crearReserva);
router.get('/', controlador.obtenerReservas);
router.get('/:id', controlador.obtenerReservaPorId);
router.put('/:id', controlador.actualizarReserva);
router.patch('/:id/cancelar', controlador.cancelarReserva);

module.exports = router;
