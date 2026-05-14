const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("sequelize_db", "postgres", "POSTgres@6969", {
    dialect: "postgres",
    host: "localhost",
});

module.exports = sequelize;