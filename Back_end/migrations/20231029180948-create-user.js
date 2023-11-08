'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(130)
      },
      password: {
        type: Sequelize.STRING(180)
      },
      status: {
        type: Sequelize.ENUM("active","inactive"),
        defaultValue: "inactive"
      },
      role: {
        type: Sequelize.ENUM("admin","mod","user"),
        defaultValue: "user"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};