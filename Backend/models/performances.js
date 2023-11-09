'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Performances extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  Performances.init({
    emp_id: DataTypes.INTEGER,
    performance_score: DataTypes.STRING,
    comments: DataTypes.STRING,
    review_date: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Performances',
    timestamps: false
  });
  return Performances;
};