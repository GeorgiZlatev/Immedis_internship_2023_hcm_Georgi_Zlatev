'use strict';

const {faker} = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = generateFakerItems(150);

    await queryInterface.bulkInsert('Experiences', items, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Experiences', null, {});

  }
};
function generateFakerItems(rowsCount) {
  // generate code for fake data
  const data = [];
  for (let k = 0; k < rowsCount; k++) {
    const newItem = {
      emp_id: faker.number.int({ min: 1, max: 150 }),
      company: faker.company.name(),
      position: faker.person.jobType(),
      start_date: faker.date.between({ from: '2024-01-01', to: '2024-05-01' }),
    };
    data.push(newItem);
  }
  return data;
}