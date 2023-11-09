'use strict';
const {
  Model
} = require('sequelize');
const {fa} = require("@faker-js/faker");
module.exports = (sequelize, DataTypes) => {
  class Leaves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  Leaves.init({
    emp_id: DataTypes.INTEGER,
    type: DataTypes.ENUM("ambulance","unpaid","paid_leave","other"),
    status_lea: DataTypes.ENUM("pending","approved","rejected"),
    start_date_lea: DataTypes.DATE,
    end_date_lea: DataTypes.DATE,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Leaves',
    timestamps:false
  });
  return Leaves;
};