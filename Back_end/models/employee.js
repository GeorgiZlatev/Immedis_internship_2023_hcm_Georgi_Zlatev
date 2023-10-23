"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Employee.init(
    {
      employee_id: DataTypes.INTEGER,
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      gender: DataTypes.ENUM("male", "female", "other"),
      date_of_birth: DataTypes.DATE,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Employee",
      timestamps: false,
    }
  );
  return Employee;
};
