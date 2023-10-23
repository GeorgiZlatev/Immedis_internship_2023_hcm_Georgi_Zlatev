"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Employees", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        defaultValue: "male",
      },
      date_of_birth: {
        type: Sequelize.DATE,
      },
      email: {
        type: Sequelize.STRING(130),
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Employees");
  },
};
