'use strict';

const {faker} = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = generateFakerItems(150);

    await queryInterface.bulkInsert('Leaves', items, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Leaves', null, {});

  }
};
function generateFakerItems(rowsCount) {
  // generate code for fake data
  const data = [];
  for (let k = 0; k < rowsCount; k++) {
    const newItem = {
      emp_id: faker.number.int({ min: 1, max: 150 }),
      type: faker.helpers.arrayElement(['ambulance', 'unpaid', 'paid_leave','other']),
      status: faker.helpers.arrayElement(['pending', 'approved', 'rejected']),
      start_date: faker.date.between({ from: '2024-01-01', to: '2024-01-15' }),
      end_date: faker.date.between({ from: '2024-01-15', to: '2024-01-30' }),
    };
    data.push(newItem);
  }
  return data;
}