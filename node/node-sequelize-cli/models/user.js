'use strict';
const { Model } = require('sequelize');
const hashPassword = require('../utils/authUtils');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
      },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
          this.setDataValue('password', hashPassword(value));
      }
  }}, 
  {
    sequelize,
    modelName: 'User',
    tableName: "users",
    underscored: true,
  });
  return User;
};