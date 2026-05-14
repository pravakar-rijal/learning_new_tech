'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      email: "ahmad.bilal@vertexitsol.com",
      first_name: "Ahmad",
      last_name: "Bilal",
      username: "ahmad.bilal",
      role_id: 1,
      password: "Vertex@123",
      created_at: new Date(),
        updated_at: new Date(),
    }], {});
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('users', null, {});
  }
};
