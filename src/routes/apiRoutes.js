const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Obtener todos los empleados
router.get('/empleado/obtenerTodos', apiController.obtenerTodos);

// Obtener un empleado por su ID
router.get('/empleado/obtenerUno/:id', apiController.obtenerEmpleadoPorId);

// Agregar un nuevo empleado
router.post('/empleado/crear', apiController.agregarEmpleado);

// Eliminar un empleado por su ID
router.delete('/empleado/eliminar/:id', apiController.eliminarEmpleado);

// Modificar un empleado por su ID
router.put('/empleado/modificar/:id', apiController.modificarEmpleado);



module.exports = router;