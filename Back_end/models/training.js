"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Training extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Training.init(
    {
      training_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
      training_name: DataTypes.STRING,
      training_date: DataTypes.DATE,
      trainer: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Training",
      timestamps: false,
    }
  );
  return Training;
};
