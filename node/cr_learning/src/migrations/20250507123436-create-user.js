'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(255),
      allowNull: false,
      unique: true
      },
      first_name: {
        type: Sequelize.STRING(255),
      allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(255)
      },
      is_active: {
        type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      },
      password: {
        type: Sequelize.STRING
      },
      sha256_key: {
        type: Sequelize.TEXT
      },
      role_id: {
        type: Sequelize.INTEGER,
        field: "role_id",
      references: {
        model: 'roles',
        key: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};