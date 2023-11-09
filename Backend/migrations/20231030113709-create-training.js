'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trainings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      EmployeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Employees" },
          key: "UserId",
        },
        allowNull: false,
      },
      training_name: {
        type: Sequelize.STRING(150),
        allowNull:false
      },
      training_date: {
        type: Sequelize.DATE
      },
      trainer: {
        type: Sequelize.STRING(150),
        allowNull:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trainings');
  }
};