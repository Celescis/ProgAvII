const empleadoService = require('../services/empleadoService');
const Empleado = require('../models/empleado');

async function obtenerTodos(req, res) {
  try {
    const empleados = await empleadoService.obtenerTodos();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function agregarEmpleado(req, res) {
  const { nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico } = req.body;

  if (!nombre || !apellido || !edad || !genero || !departamento || !salario || !fechaContratacion || !direccion || !telefono || !correoElectronico) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  if (typeof edad !== 'number' || typeof salario !== 'number') {
    return res.status(400).send('Edad y salario deben ser números');
  }

  const nuevoEmpleado = new Empleado(null, nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico);

  try {
    const message = await empleadoService.agregarEmpleado(nuevoEmpleado);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function eliminarEmpleado(req, res) {
  const empleadoId = req.params.id;

  if (!empleadoId) {
    return res.status(400).send('ID del empleado es obligatorio');
  }

  try {
    const message = await empleadoService.eliminarEmpleado(empleadoId);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function modificarEmpleado(req, res) {
  const empleadoId = req.params.id;
  const { nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico } = req.body;

  if (!empleadoId) {
    return res.status(400).send('ID del empleado es obligatorio');
  }
  if (!nombre || !apellido || !edad || !genero || !departamento || !salario || !fechaContratacion || !direccion || !telefono || !correoElectronico) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  if (typeof edad !== 'number' || typeof salario !== 'number') {
    return res.status(400).send('Edad y salario deben ser números');
  }

  const empleadoActualizado = new Empleado(empleadoId, nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico);

  try {
    const message = await empleadoService.modificarEmpleado(empleadoActualizado);
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function obtenerEmpleadoPorId(req, res) {
  const empleadoId = req.params.id;

  if (!empleadoId) {
    return res.status(400).send('ID del empleado es obligatorio');
  }

  try {
    const empleado = await empleadoService.obtenerEmpleadoPorId(empleadoId);
    res.status(200).json(empleado);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = {
  obtenerTodos,
  agregarEmpleado,
  eliminarEmpleado,
  modificarEmpleado,
  obtenerEmpleadoPorId
};