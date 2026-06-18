const mongoose = require('mongoose');

const detallePedidoSchema = new mongoose.Schema({
  nombreProducto: {
    type: String,
    required: true,
    trim: true
  },
  cantidad: {
    type: Number,
    required: true,
    min: 1
  },
  precioUnitario: {
    type: Number,
    required: true,
    min: 0
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0
  }
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
  cliente: {
    type: String,
    required: true,
    trim: true
  },
  mesa: {
    type: Number,
    required: true
  },
  productos: {
    type: [detallePedidoSchema],
    required: true
  },
  total: {
    type: Number,
    required: true,
    min: 0
  },
  estado: {
    type: String,
    enum: ['Pendiente', 'En preparación', 'Servido', 'Cancelado', 'Pagado'],
    default: 'Pendiente'
  },
  metodoPago: {
    type: String,
    enum: ['Efectivo', 'Tarjeta', 'Transferencia', 'Pendiente'],
    default: 'Pendiente'
  },
  observaciones: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Pedido', pedidoSchema);