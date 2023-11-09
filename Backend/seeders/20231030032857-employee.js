'use strict';

const {faker} = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const items = generateFakerItems(150);
    await queryInterface.bulkInsert('Employees', items, {});
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Employees', null, {});

  }
};
function generateFakerItems(rowsCount) {
  // generate code for fake data
  const data = [];
  for (let k = 0; k < rowsCount; k++) {
    const newItem = {
      emp_id: faker.number.int({ min: 1, max: 150 }),
      firstName: faker.person.firstName(),
      surName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      gender: faker.helpers.arrayElement(["male","female","other"]),
      dataOfBirth: faker.date.birthdate({ min: 1959, max: 2003, mode: 'year' }),
      address: faker.location.streetAddress(),
      phoneNo: faker.phone.number(),
    };
    data.push(newItem);
  }
  return data;
}