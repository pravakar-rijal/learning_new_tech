'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users', [{
        first_name: "Pravakar",
        last_name: "Rijal",
        password: "Pra@123",
        email: "pravakarrijal@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
    },{
      first_name: "Sri",
      last_name: "Krishna",
      password: "Sri@123",
      email: "srikrishna@gmail.com",
      created_at: new Date(),
        updated_at: new Date(),
  },{
        first_name: "Radhe",
        last_name: "Krishna",
        password: "Radhe@123",
        email: "radhekrishna@gmail.com",
        created_at: new Date(),
        updated_at: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
