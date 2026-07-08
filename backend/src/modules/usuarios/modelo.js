const mongoose = require('mongoose');
const { TODOS_LOS_ROLES, ROLES } = require('../../config/roles');

const usuarioSchema = new mongoose.Schema({
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
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  clave: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: TODOS_LOS_ROLES,
    default: ROLES.PERSONAL_SERVICIO
  },
  activo: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Usuario', usuarioSchema);
