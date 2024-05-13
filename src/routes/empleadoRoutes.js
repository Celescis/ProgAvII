const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');

// Obtener todos los empleados
router.get('/empleado/obtenerTodos', empleadoController.obtenerTodos);

// Agregar un nuevo empleado
router.post('/empleado/crear', empleadoController.agregarEmpleado);

// Eliminar un empleado por su ID
router.delete('/empleado/eliminar/:id', empleadoController.eliminarEmpleado);

// Modificar un empleado por su ID
router.put('/empleado/modificar/:id', empleadoController.modificarEmpleado);

module.exports = router;