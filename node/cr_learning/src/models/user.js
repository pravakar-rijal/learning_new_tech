'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        as: "role"
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'last_name',
    },
    username: {
      type: DataTypes.STRING(255),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'is_active',
    },
    password: {
      type: DataTypes.STRING,
      set(value){
        this.setDataValue('password', hashPassword(value))
      }
    },
    sha256Key: {
      type: DataTypes.TEXT
    },
    roleId: {
      type: DataTypes.INTEGER,
      field: "role_id",
      references: {
        model: 'roles',
        key: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });
  return User;
};