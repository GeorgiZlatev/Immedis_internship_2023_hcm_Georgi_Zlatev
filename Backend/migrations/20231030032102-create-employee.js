'use strict';
const {fa} = require("@faker-js/faker");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "Users" },
          key: "id",
        },
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING(120),
        allowNull:false
      },
      surName: {
        type: Sequelize.STRING(100),
        allowNull:false
      },
      lastName: {
        type: Sequelize.STRING(150),
        allowNull:false
      },
      gender: {
        type: Sequelize.ENUM("male","female","other"),
        defaultValue: "male"
      },
      dateOfBirth: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING(180),
        allowNull:false
      },
      phoneNo: {
        type: Sequelize.STRING(30),
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
    await queryInterface.dropTable('Employees');
  }
};