'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('roles', [{
        role_name: "Super Admin",
        is_active: true,
        description: "Super Admin from Vertex",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Admin",
        is_active: true,
        description: "Clien Admin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Director",
        is_active: true,
        description: "Director operations",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        role_name: "Lead Quality Assurance",
        is_active: true,
        description: "Lead Quality Assurance Team",
        created_at: new Date(),
        updated_at: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('roles', null, {});
  }
};
