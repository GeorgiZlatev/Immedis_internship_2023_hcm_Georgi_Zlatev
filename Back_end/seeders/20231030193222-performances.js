'use strict';

const {faker} = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = generateFakerItems(150);

    await queryInterface.bulkInsert('Performances', items, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Performances', null, {});

  }
};
function generateFakerItems(rowsCount) {
  // generate code for fake data
  const data = [];
  for (let k = 0; k < rowsCount; k++) {
    const newItem = {
      emp_id: faker.number.int({ min: 1, max: 150 }),
      performance_score: faker.helpers.arrayElement(['good', 'very_good', 'excellent','badly']),
      comments: faker.lorem.text(),
      review_date: faker.date.between({ from: '2024-04-01', to: '2024-04-28' }),
    };
    data.push(newItem);
  }
  return data;
}