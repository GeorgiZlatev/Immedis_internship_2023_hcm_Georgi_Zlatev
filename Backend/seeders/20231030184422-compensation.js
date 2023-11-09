'use strict';

const {faker} = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = generateFakerItems(150);

    await queryInterface.bulkInsert('Compensations', items, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Compensations', null, {});

  }
};
function generateFakerItems(rowsCount) {
  // generate code for fake data
  const data = [];
  for (let k = 0; k < rowsCount; k++) {
    const newItem = {
      emp_id: faker.number.int({ min: 1, max: 150 }),
      salary: faker.commerce.price({ min: 2000, max: 8000 }),
      currency: faker.finance.currencyCode(),
      bonuses: faker.commerce.price({ min: 100, max: 200 }),
    };
    data.push(newItem);
  }
  return data;
}