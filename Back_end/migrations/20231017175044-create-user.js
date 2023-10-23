"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(130),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(130),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(150),
      },
      role: {
        type: Sequelize.ENUM("1", "2", "3"), //1 - admin, 2 - hr, 3 - employee
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
