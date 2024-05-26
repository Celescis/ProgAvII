const Empleado = require('../models/empleado');

async function obtenerTodos(req, res) {
  try {
    const empleados = await Empleado.findAll();
    res.status(200).json(empleados);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function agregarEmpleado(req, res) {
  const { nombre, apellido, edad, genero, departamento, salario, fecha_contratacion, direccion, telefono, correo_electronico } = req.body;

  if (!nombre || !apellido || !edad || !genero || !departamento || !salario || !fecha_contratacion || !direccion || !telefono || !correo_electronico) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  if (typeof edad !== 'number' || typeof salario !== 'number') {
    return res.status(400).send('Edad y salario deben ser números');
  }

  try {
    const nuevoEmpleado = await Empleado.create({ 
      nombre, 
      apellido, 
      edad, 
      genero, 
      departamento, 
      salario, 
      fecha_contratacion, 
      direccion, 
      telefono, 
      correo_electronico 
    });
    res.status(201).json({ message: 'Empleado agregado exitosamente', empleado: nuevoEmpleado });
  } catch (error) {
    console.error('Error al agregar el empleado:', error);
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send('Datos inválidos: ' + error.errors.map(e => e.message).join(', '));
    } else {
      res.status(500).send('Error interno del servidor');
    }
  }
}

async function eliminarEmpleado(req, res) {
  const empleadoId = parseInt(req.params.id, 10);

  if (isNaN(empleadoId)) {
    return res.status(400).send('ID del empleado debe ser un número');
  }

  try {
    const resultado = await Empleado.destroy({ where: { id: empleadoId } });
    if (resultado === 0) {
      return res.status(404).send('Empleado no encontrado');
    }
    res.status(200).json({ message: 'Empleado eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    res.status(500).send('Error interno del servidor');
  }
}

async function modificarEmpleado(req, res) {
  const empleadoId = parseInt(req.params.id, 10);
  const { nombre, apellido, edad, genero, departamento, salario, fecha_contratacion, direccion, telefono, correo_electronico } = req.body;

  if (isNaN(empleadoId)) {
    return res.status(400).send('ID del empleado debe ser un número');
  }
  if (!nombre || !apellido || !edad || !genero || !departamento || !salario || !fecha_contratacion || !direccion || !telefono || !correo_electronico) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  if (typeof edad !== 'number' || typeof salario !== 'number') {
    return res.status(400).send('Edad y salario deben ser números');
  }

  try {
    const [resultado] = await Empleado.update({ 
      nombre, 
      apellido, 
      edad, 
      genero, 
      departamento, 
      salario, 
      fecha_contratacion, 
      direccion, 
      telefono, 
      correo_electronico 
    }, {
      where: { id: empleadoId }
    });

    if (resultado === 0) {
      return res.status(404).send('Empleado no encontrado');
    }

    res.status(200).json({ message: 'Empleado modificado exitosamente' });
  } catch (error) {
    console.error('Error al modificar el empleado:', error);
    if (error.name === 'SequelizeValidationError') {
      res.status(400).send('Datos inválidos: ' + error.errors.map(e => e.message).join(', '));
    } else {
      res.status(500).send('Error interno del servidor');
    }
  }
}

async function obtenerEmpleadoPorId(req, res) {
  const empleadoId = parseInt(req.params.id, 10);

  if (isNaN(empleadoId)) {
    return res.status(400).send('ID del empleado debe ser un número');
  }

  try {
    const empleado = await Empleado.findByPk(empleadoId);

    if (!empleado) {
      return res.status(404).send('Empleado no encontrado');
    }

    res.status(200).json(empleado);
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = {
  obtenerTodos,
  agregarEmpleado,
  eliminarEmpleado,
  modificarEmpleado,
  obtenerEmpleadoPorId
};
