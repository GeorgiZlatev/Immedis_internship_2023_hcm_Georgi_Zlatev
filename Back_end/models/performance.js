"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Performance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Performance.init(
    {
      performance_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
      performance_score: DataTypes.FLOAT,
      review_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Performance",
      timestamps: false,
    }
  );
  return Performance;
};
