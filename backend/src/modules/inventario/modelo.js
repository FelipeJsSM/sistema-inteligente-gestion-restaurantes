const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  categoria: {
    type: String,
    required: true,
    trim: true
  },
  unidadMedida: {
    type: String,
    enum: ['Unidad', 'Libra', 'Kilogramo', 'Litro', 'Galón', 'Paquete'],
    required: true
  },
  cantidadDisponible: {
    type: Number,
    required: true,
    min: 0
  },
  nivelMinimo: {
    type: Number,
    required: true,
    min: 0
  },
  proveedor: {
    type: String,
    trim: true
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventario', inventarioSchema);