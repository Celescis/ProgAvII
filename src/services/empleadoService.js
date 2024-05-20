const { conn } = require('../config/conn');

async function obtenerTodos() {
  try {
    const [rows] = await conn.query('SELECT * FROM empleados');
    return rows;
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    throw new Error('Error interno del servidor');
  }
}

async function agregarEmpleado(nuevoEmpleado) {
  try {
    const empleadoData = Object.values(nuevoEmpleado).filter(value => value !== null);
    await conn.query('INSERT INTO empleados (nombre, apellido, edad, genero, departamento, salario, fecha_contratacion, direccion, telefono, correo_electronico) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', empleadoData);
    return { message: 'Empleado agregado exitosamente' };
  } catch (error) {
    console.error('Error al agregar el empleado:', error);
    throw new Error('Error interno del servidor');
  }
}

async function eliminarEmpleado(empleadoId) {
  try {
    const [existingEmpleado] = await conn.query('SELECT 1 FROM empleados WHERE id = ?', [empleadoId]);
    if (existingEmpleado.length === 0) {
      throw new Error('Empleado no encontrado');
    }

    await conn.query('DELETE FROM empleados WHERE id = ?', [empleadoId]);
    return { message: 'Empleado eliminado exitosamente' };
  } catch (error) {
    console.error('Error al eliminar el empleado:', error);
    throw new Error('Error interno del servidor');
  }
}

async function modificarEmpleado(empleadoActualizado) {
  try {
    const empleadoData = Object.values(empleadoActualizado);
    if (empleadoData.length !== 11) {
      throw new Error('Datos incompletos para la actualización del empleado');
    }

    const [existingEmpleado] = await conn.query('SELECT 1 FROM empleados WHERE id = ?', [empleadoActualizado.id]);
    if (existingEmpleado.length === 0) {
      throw new Error('Empleado no encontrado');
    }

    const query = `
      UPDATE empleados 
      SET nombre = ?, apellido = ?, edad = ?, genero = ?, departamento = ?, salario = ?, fecha_contratacion = ?, direccion = ?, telefono = ?, correo_electronico = ?
      WHERE id = ?`;

    const empleadoId = empleadoActualizado.id;
    await conn.query(query, [...empleadoData.slice(1), empleadoId]);

    return { message: 'Empleado modificado exitosamente' };
  } catch (error) {
    console.error('Error al modificar el empleado:', error);
    throw new Error('Error interno del servidor');
  }
}

async function obtenerEmpleadoPorId(empleadoId) {
  try {
    const [rows] = await conn.query('SELECT * FROM empleados WHERE id = ?', [empleadoId]);
    if (rows.length === 0) {
      throw new Error('Empleado no encontrado');
    }
    return rows[0];
  } catch (error) {
    console.error('Error al obtener el empleado:', error);
    throw new Error('Error interno del servidor');
  }
}

module.exports = {
  obtenerTodos,
  agregarEmpleado,
  eliminarEmpleado,
  modificarEmpleado,
  obtenerEmpleadoPorId
};
