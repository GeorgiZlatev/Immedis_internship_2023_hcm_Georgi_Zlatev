'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Performances', {
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
      performance_score: {
        type: Sequelize.STRING(120),
        allowNull:false
      },
      comments: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      review_date: {
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
    await queryInterface.dropTable('Performances');
  }
};
