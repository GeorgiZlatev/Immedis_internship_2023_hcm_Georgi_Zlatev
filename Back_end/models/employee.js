'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.User, {
        foreignKey: 'UserId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });


    }
  }
  Employee.init({
    UserId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    surName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.ENUM("male","female","other"),
    dateOfBirth: DataTypes.DATE,
    address: DataTypes.STRING,
    phoneNo: DataTypes.STRING,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps:false
  });
  return Employee;
};