const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpleadoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  edad: {
    type: Number,
    required: true,
    min: 0
  },
  genero: {
    type: String,
    required: true,
    trim: true
  },
  departamento: {
    type: String,
    required: true,
    trim: true
  },
  salario: {
    type: Number,
    required: true,
    min: 0
  },
  fecha_contratacion: {
    type: Date,
    required: true
  },
  direccion: {
    type: String,
    required: true,
    trim: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  correo_electronico: {
    type: String,
    required: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Correo electrónico inválido']
  }
}, {
  collection: 'empleados',
  timestamps: false
});

const Empleado = mongoose.model('Empleado', EmpleadoSchema);
module.exports = Empleado;
