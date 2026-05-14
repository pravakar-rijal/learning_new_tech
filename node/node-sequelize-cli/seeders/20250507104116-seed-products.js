'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('products', [{
        product_name: "Scorpio Car",
        product_price: "5000000",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
    },
    {
      product_name: "Calculator",
      product_price: "808",
      user_id: 2,
      created_at: new Date(),
        updated_at: new Date(),
  },
  {
    product_name: "Scooter",
    product_price: "64983",
    user_id: 3,
    created_at: new Date(),
        updated_at: new Date(),
}], {});
   
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.bulkDelete('products', null, {});
    
  }
};
