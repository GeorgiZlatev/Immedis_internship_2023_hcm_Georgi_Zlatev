'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Experiences extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Experiences.belongsTo(models.Employee, {
        foreignKey: 'EmployeeId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });

    }
  }
  Experiences.init({
    emp_id: DataTypes.INTEGER,
    company: DataTypes.STRING,
    position: DataTypes.STRING,
    start_date_exp: DataTypes.DATE,
    end_date_exp: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Experiences',
    timestamps:false
  });
  return Experiences;
};