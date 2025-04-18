'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feedback.belongsTo(models.Product, {
        foreignKey: 'productId'
      }),
      Feedback.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Feedback.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    start: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Feedback',
    tableName: 'feedbacks'
  });
  return Feedback;
};