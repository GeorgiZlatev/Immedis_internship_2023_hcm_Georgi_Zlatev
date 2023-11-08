'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Compensations', {
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
      salary: {
        type: Sequelize.INTEGER
      },
      currency: {
        type: Sequelize.STRING(120),
        allowNull: false
      },
      bonuses: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Compensations');
  }
};