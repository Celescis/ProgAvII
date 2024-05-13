class Empleado {
    constructor(id, nombre, apellido, edad, genero, departamento, salario, fechaContratacion, direccion, telefono, correoElectronico) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.genero = genero;
        this.departamento = departamento;
        this.salario = salario;
        this.fechaContratacion = fechaContratacion;
        this.direccion = direccion;
        this.telefono = telefono;
        this.correoElectronico = correoElectronico;
    }
}

module.exports = Empleado;