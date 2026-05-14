'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user"
      })
    }
  }
  Product.init({
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_name",
    },
    productPrice: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "product_price"
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
      references:{
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: "products",
    underscored: true,
  });
  return Product;
};