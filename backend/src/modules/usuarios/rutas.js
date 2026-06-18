const express = require('express');
const controlador = require('./controlador');

const router = express.Router();

router.post('/', controlador.crearUsuario);
router.get('/', controlador.obtenerUsuarios);
router.get('/:id', controlador.obtenerUsuarioPorId);
router.put('/:id', controlador.actualizarUsuario);
router.delete('/:id', controlador.eliminarUsuario);

module.exports = router;