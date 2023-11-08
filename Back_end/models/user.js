'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Employee,{
        foreignKey: 'UserId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      User.hasOne(models.Experiences,{
        foreignKey: 'EmployeeId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      User.hasOne(models.Leaves,{
        foreignKey: 'EmployeeId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      User.hasOne(models.Compensation,{
        foreignKey: 'EmployeeId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      User.hasOne(models.Education,{
        foreignKey: 'EmployeeId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      User.hasOne(models.Performances,{
        foreignKey: 'EmployeeId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

      User.hasOne(models.Training,{
        foreignKey: 'EmployeeId',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      });

    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.ENUM("active","inactive"),
    role: DataTypes.ENUM("admin","mod","user"),
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  return User;
};