"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Compensations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      compensation_id: {
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
      },
      salary: {
        type: Sequelize.DECIMAL,
      },
      bonuses: {
        type: Sequelize.DECIMAL,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Compensations");
  },
};
