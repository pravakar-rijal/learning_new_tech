'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User,{
        foreignKey: "roleId",
        as: "role"
      })
    }
  }
  Role.init({
    roleName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "role_name"
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
    description: {
      type: DataTypes.STRING(255),
    }
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    underscored: true,
  });
  return Role;
};