'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewsDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewsDetails.belongsTo(models.News, {
        foreignKey: 'newsId'
      }),
      NewsDetails.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
    }
  }
  NewsDetails.init({
    productId: DataTypes.INTEGER,
    newsId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'NewsDetails',
    tableName: 'newsDetails'
  });
  return NewsDetails;
};