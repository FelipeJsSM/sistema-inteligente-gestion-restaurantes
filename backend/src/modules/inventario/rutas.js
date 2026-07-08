const express = require('express');
const controlador = require('./controlador');
const { verificarToken, permitirRoles } = require('../../middlewares/authMiddleware');
const { ROLES } = require('../../config/roles');

const router = express.Router();

const accesoInventario = permitirRoles(
  ROLES.ADMINISTRADOR,
  ROLES.ENCARGADO_OPERACIONES,
  ROLES.PERSONAL_INVENTARIO
);

router.use(verificarToken);
router.use(accesoInventario);

router.post('/', controlador.crearProducto);
router.get('/', controlador.obtenerProductos);
router.get('/bajo-stock', controlador.obtenerProductosBajoStock);
router.get('/:id', controlador.obtenerProductoPorId);
router.put('/:id', controlador.actualizarProducto);
router.patch('/:id/entrada', controlador.registrarEntrada);
router.patch('/:id/salida', controlador.registrarSalida);
router.delete('/:id', controlador.eliminarProducto);

module.exports = router;
