'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BannerDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      BannerDetails.belongsTo(models.Banner, {
        foreignKey: 'bannerId'
      }),
      BannerDetails.belongsTo(models.Product, {
        foreignKey: 'productId'
      })
    }
  }
  BannerDetails.init({
    productId: DataTypes.INTEGER,
    bannerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BannerDetails',
    tableName: 'bannerDetails'
  });
  return BannerDetails;
};