'use strict';

const {faker} = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = generateFakerItems(150);

    await queryInterface.bulkInsert('Trainings', items, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Trainings', null, {});

  }
};
function generateFakerItems(rowsCount) {
  // generate code for fake data
  const data = [];
  for (let k = 0; k < rowsCount; k++) {
    const newItem = {
      emp_id: faker.number.int({ min: 1, max: 150 }),
      training_name: faker.person.fullName(),
      training_date: faker.date.between({ from: '2024-01-01', to: '2027-01-01' }),
      trainer: faker.person.jobType(),
    };
    data.push(newItem);
  }
  return data;
}