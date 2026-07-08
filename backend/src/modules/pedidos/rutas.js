const express = require('express');
const controlador = require('./controlador');
const { verificarToken, permitirRoles } = require('../../middlewares/authMiddleware');
const { ROLES } = require('../../config/roles');

const router = express.Router();

const accesoPedidos = permitirRoles(
  ROLES.ADMINISTRADOR,
  ROLES.ENCARGADO_OPERACIONES,
  ROLES.PERSONAL_SERVICIO
);

router.use(verificarToken);
router.use(accesoPedidos);

router.post('/', controlador.crearPedido);
router.get('/', controlador.obtenerPedidos);
router.get('/productos-mas-consumidos', controlador.obtenerProductosMasConsumidos);
router.get('/:id', controlador.obtenerPedidoPorId);
router.patch('/:id/estado', controlador.actualizarEstadoPedido);
router.patch('/:id/cancelar', controlador.cancelarPedido);

module.exports = router;
