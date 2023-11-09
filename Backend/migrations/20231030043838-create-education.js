'use strict';
const {fa} = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Education', {
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
      degree: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      institution: {
        type: Sequelize.STRING(200),
        allowNull:false
      },
      start_date_edu: {
        type: Sequelize.DATE
      },
      end_date_edu: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Education');
  }
};