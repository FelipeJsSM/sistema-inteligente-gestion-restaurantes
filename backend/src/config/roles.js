const ROLES = {
  ADMINISTRADOR: 'Administrador',
  ENCARGADO_OPERACIONES: 'Encargado de Operaciones',
  PERSONAL_INVENTARIO: 'Personal de Inventario',
  PERSONAL_SERVICIO: 'Personal de Servicio'
};

const TODOS_LOS_ROLES = Object.values(ROLES);

module.exports = {
  ROLES,
  TODOS_LOS_ROLES
};
