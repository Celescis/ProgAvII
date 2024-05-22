class Empleado {
    constructor(id, nombre, apellido, edad, genero, departamento, salario, fecha_contratacion, direccion, telefono, correo_electronico) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.genero = genero;
        this.departamento = departamento;
        this.salario = salario;
        this.fecha_contratacion = fecha_contratacion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correo_electronico = correo_electronico;
    }
}

module.exports = Empleado;
