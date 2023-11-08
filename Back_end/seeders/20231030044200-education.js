'use strict';
const {faker} = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = generateFakerItems(150);

      await queryInterface.bulkInsert('Education', items, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Education', null, {});

  }
};
function generateFakerItems(rowsCount) {
  // generate code for fake data
  const data = [];
  for (let k = 0; k < rowsCount; k++) {
    const newItem = {
      emp_id: faker.number.int({ min: 1, max: 150 }),
      degree: faker.helpers.arrayElement(['Professional Bachelor', 'a bachelor\'s degree', 'Master\'s degree']),
      institution: faker.helpers.arrayElement(['Technical University Varna', 'Technical University Sofia', 'Technical University Burgas']),
      start_date: faker.date.between({ from: '2019-01-01', to: '2023-01-01' }),
      end_date: faker.date.between({ from: '2019-01-01', to: '2023-01-01' }),
    };
    data.push(newItem);
  }
  return data;
}