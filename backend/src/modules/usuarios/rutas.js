const express = require('express');
const controlador = require('./controlador');
const { verificarToken, permitirRoles } = require('../../middlewares/authMiddleware');
const { ROLES } = require('../../config/roles');

const router = express.Router();

router.use(verificarToken);
router.use(permitirRoles(ROLES.ADMINISTRADOR));

router.post('/', controlador.crearUsuario);
router.get('/', controlador.obtenerUsuarios);
router.get('/:id', controlador.obtenerUsuarioPorId);
router.put('/:id', controlador.actualizarUsuario);
router.delete('/:id', controlador.eliminarUsuario);

module.exports = router;
