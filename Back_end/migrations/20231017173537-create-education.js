"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Education", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      education_id: {
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
      },
      degree: {
        type: Sequelize.STRING(180),
        allowNull: false,
      },
      institution: {
        type: Sequelize.STRING(200),
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
    await queryInterface.dropTable("Education");
  },
};
