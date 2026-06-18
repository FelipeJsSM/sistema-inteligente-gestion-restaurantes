const express = require('express');
const controlador = require('./controlador');
const { verificarToken } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verificarToken, controlador.crearProducto);
router.get('/', verificarToken, controlador.obtenerProductos);
router.get('/bajo-stock', verificarToken, controlador.obtenerProductosBajoStock);
router.get('/:id', verificarToken, controlador.obtenerProductoPorId);
router.put('/:id', verificarToken, controlador.actualizarProducto);
router.patch('/:id/entrada', verificarToken, controlador.registrarEntrada);
router.patch('/:id/salida', verificarToken, controlador.registrarSalida);
router.delete('/:id', verificarToken, controlador.eliminarProducto);

module.exports = router;