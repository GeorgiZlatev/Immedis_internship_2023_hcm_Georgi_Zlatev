"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Trainings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      training_id: {
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
      },
      training_name: {
        type: Sequelize.STRING(130),
        allowNull: false,
      },
      training_date: {
        type: Sequelize.DATE,
      },
      trainer: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Trainings");
  },
};
