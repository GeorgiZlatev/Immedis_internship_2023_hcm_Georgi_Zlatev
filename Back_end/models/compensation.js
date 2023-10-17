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
    }
  }
  Compensation.init({
    compensation_id: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
    salary: DataTypes.DECIMAL,
    bonuses: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Compensation',
  });
  return Compensation;
};