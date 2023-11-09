'use strict';
const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const items = generateFakerItems(50);
      await queryInterface.bulkInsert('Users', items, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
function generateFakerItems(rowsCount) {
    // generate code for fake data
    const data = [];
    for (let k = 0; k < rowsCount; k++) {
        const newItem = {
            email: faker.internet.email(),
            password: faker.helpers.arrayElement(["1234"]),
            status: faker.helpers.arrayElement(["active","inactive"]),
            role: faker.helpers.arrayElement(["user","admin","mod"]),
        };
        data.push(newItem);
    }
    return data;
}
