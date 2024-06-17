const Empleado = require('../models/empleado');

// Renderizar alta
async function renderAlta(req, res) {
    try {
        return res.render('empleado/crearEmpleado', { modificar: false });
    } catch (error) {
        req.flash('error', 'Error interno del servidor');
        return res.redirect('/empleado/crear');
    }
}

// Renderizar modificación
async function renderModificacion(req, res) {
    try {
        const empleado = await Empleado.findById(req.params.id);
        if (!empleado) {
            req.flash('error', 'Empleado no encontrado');
            return res.redirect('/');
        }

        empleado.fecha_contratacion = new Date(empleado.fecha_contratacion);
        return res.render('empleado/crearEmpleado', { modificar: true, empleado });
    } catch (error) {
        req.flash('error', 'Error interno del servidor');
        return res.redirect('/');
    }
}

// Renderizar listar
async function renderMostrarTodos(req, res) {
    try {
        const empleados = await Empleado.find();
        res.render('empleado/listarEmpleados', { empleados });
    } catch (error) {
        console.error('Error al obtener los empleados:', error);
        req.flash('error', 'Error interno del servidor');
        res.redirect('/');
    }
}

// Alta empleado
async function crearEmpleado(req, res) {
    try {
        const { nombre, apellido, edad, genero, departamento, salario, fecha_contratacion, direccion, telefono, correo_electronico } = req.body;

        const nuevoEmpleado = new Empleado({
            nombre,
            apellido,
            edad: parseInt(edad, 10),
            genero,
            departamento,
            salario: parseFloat(salario),
            fecha_contratacion,
            direccion,
            telefono,
            correo_electronico
        });

        await nuevoEmpleado.save();
        req.flash('success', '¡El empleado se agregó exitosamente!');
        return res.redirect('/');
    } catch (error) {
        console.error('Error al agregar el empleado:', error);
        req.flash('error', 'Error interno del servidor');
        return res.redirect('/empleado/crear');
    }
}

// Modificar empleado
async function modificarEmpleado(req, res) {
    try {
        const empleado = await Empleado.findById(req.params.id);
        if (!empleado) {
            req.flash('error', 'Empleado no encontrado');
            return res.redirect('/');
        }

        const { nombre, apellido, edad, genero, departamento, salario, fecha_contratacion, direccion, telefono, correo_electronico } = req.body;
        const empleadoActualizado = {
            nombre,
            apellido,
            edad: parseInt(edad, 10),
            genero,
            departamento,
            salario: parseFloat(salario),
            fecha_contratacion,
            direccion,
            telefono,
            correo_electronico
        };

        await Empleado.findByIdAndUpdate(req.params.id, empleadoActualizado);
        req.flash('success', '¡El empleado se modificó exitosamente!');
        return res.redirect('/');
    } catch (error) {
        console.error('Error al actualizar el empleado:', error);
        req.flash('error', 'Error interno del servidor');
        return res.redirect('/');
    }
}

// Eliminar empleado
async function eliminarEmpleado(req, res) {
    const id = req.params.id;
    try {
        const empleadoExiste = await Empleado.findById(id);
        if (!empleadoExiste) {
            req.flash('error', 'Empleado no encontrado');
            return res.redirect('/');
        }
        await Empleado.findByIdAndDelete(id);
        req.flash('success', 'Empleado eliminado exitosamente');
        return res.redirect('/');
    } catch (error) {
        console.error('Error al eliminar el empleado:', error);
        req.flash('error', 'Error interno del servidor');
        return res.redirect('/');
    }
}

module.exports = {
    renderAlta,
    renderModificacion,
    renderMostrarTodos,
    crearEmpleado,
    modificarEmpleado,
    eliminarEmpleado
};
