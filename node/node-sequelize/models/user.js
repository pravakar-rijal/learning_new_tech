const { DataTypes, Model } = require('sequelize');
const sequelize = require("../database");

class User extends Model{}


User.init({
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: "User",
    tableName: "users"
});

module.exports = User;