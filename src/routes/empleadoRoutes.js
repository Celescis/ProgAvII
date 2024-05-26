const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

//Rutas para renderizar alta, modificacion y listar
router.get('/crear', empleadoController.renderAlta);
router.get('/editar/:id', empleadoController.renderModificacion);
router.get('/listar', empleadoController.renderMostrarTodos);

//Rutas para funcion de alta, modificar, eliminar
router.post('/crear', empleadoController.crearEmpleado);
router.post('/editar/:id', empleadoController.modificarEmpleado);
router.get('/eliminar/:id', empleadoController.eliminarEmpleado);

module.exports = router;
