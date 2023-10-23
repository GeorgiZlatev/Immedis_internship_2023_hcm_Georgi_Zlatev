"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Experiences", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      experience_id: {
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
      },
      company: {
        type: Sequelize.STRING(180),
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Experiences");
  },
};
