const express = require('express');
const controlador = require('./controlador');
const { verificarToken, permitirRoles } = require('../../middlewares/authMiddleware');
const { ROLES } = require('../../config/roles');

const router = express.Router();

router.get(
  '/',
  verificarToken,
  permitirRoles(ROLES.ADMINISTRADOR, ROLES.ENCARGADO_OPERACIONES),
  controlador.obtenerResumenDashboard
);

module.exports = router;
