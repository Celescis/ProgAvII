// empleadoController.js

const { conn } = require('../config/conn');
const Empleado = require('../models/empleado');

async function obtenerTodos(req, res) {
  try {
    const [rows] = await conn.query('SELECT * FROM empleados');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function agregarEmpleado(req, res) {
  const { nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico } = req.body;
  const nuevoEmpleado = new Empleado(nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico);

  try {
    const empleadoData = Object.values(nuevoEmpleado);
    await conn.query('INSERT INTO empleados (nombre, apellido, edad, genero, departamento, salario, fecha_contratacion, direccion, telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', empleadoData);
    res.status(201).json({ message: 'Empleado agregado exitosamente' });
  } catch (error) {
    console.error('Error al agregar el empleado:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function eliminarEmpleado(req, res) {
  const empleadoId = req.params.id;

  try {
    await conn.query('DELETE FROM empleados WHERE id = ?', [empleadoId]);
    res.status(200).json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function modificarEmpleado(req, res) {
  const empleadoId = req.params.id;
  const { nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico } = req.body;
  const empleadoActualizado = new Empleado(nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico);

  try {
    const empleadoData = Object.values(empleadoActualizado);
    await conn.query('UPDATE empleados SET nombre = ?, apellido = ?, edad = ?, genero = ?, departamento = ?, salario = ?, fecha_contratacion = ?, direccion = ?, telefono = ?, correo_electronico = ? WHERE id = ?', [...empleadoData, empleadoId]);
    res.status(200).json({ message: 'Empleado modificado exitosamente' });
  } catch (error) {
    console.error('Error al modificar el empleado:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  obtenerTodos,
  agregarEmpleado,
  eliminarEmpleado,
  modificarEmpleado
};

