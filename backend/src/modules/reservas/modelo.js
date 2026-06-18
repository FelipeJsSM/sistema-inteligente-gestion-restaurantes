const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombreCliente: {
    type: String,
    required: true,
    trim: true
  },
  telefonoCliente: {
    type: String,
    required: true,
    trim: true
  },
  fecha: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  cantidadPersonas: {
    type: Number,
    required: true,
    min: 1
  },
  mesaAsignada: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'Confirmada', 'Cancelada', 'Completada'],
    default: 'Pendiente'
  },
  observaciones: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reserva', reservaSchema);