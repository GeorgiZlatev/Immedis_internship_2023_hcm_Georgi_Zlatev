'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compensation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Compensation.belongsTo(models.User); //reverse case => Compensation belongs to User model
      Compensation.belongsTo(models.Employee, { foreignKey: 'EmployeeId' }); //reverse case => Experiences belongs to Leaves model
      Compensation.belongsTo(models.Education, { foreignKey: 'EmployeeId' });
    }
  }
  Compensation.init({
    emp_id: DataTypes.INTEGER,
    salary: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    bonuses: DataTypes.INTEGER,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Compensation',
    timestamps: false
  });
  return Compensation;
};