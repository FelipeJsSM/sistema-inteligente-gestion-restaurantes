const express = require('express');
const controlador = require('./controlador');
const { verificarToken } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verificarToken, controlador.crearPedido);
router.get('/', verificarToken, controlador.obtenerPedidos);
router.get('/productos-mas-consumidos', verificarToken, controlador.obtenerProductosMasConsumidos);
router.get('/:id', verificarToken, controlador.obtenerPedidoPorId);
router.patch('/:id/estado', verificarToken, controlador.actualizarEstadoPedido);
router.patch('/:id/cancelar', verificarToken, controlador.cancelarPedido);

module.exports = router;