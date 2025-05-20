"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Expense extends Model {
    static associate(models) {
      // Each Expense belongs to one User
      Expense.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Expense.init(
    {
      amount: DataTypes.FLOAT,
      category: DataTypes.STRING,
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Expense",
    }
  );
  return Expense;
};
