"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Education.init(
    {
      education_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
      degree: DataTypes.STRING,
      institution: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Education",
      timestamps: false,
    }
  );
  return Education;
};
