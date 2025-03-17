'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Brand, {
        foreignKey: 'brandId'
      }),
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      }),
      Product.hasMany(models.OrderDetails, {
        foreignKey: 'productId'
      }),
      Product.hasMany(models.BannerDetails, {
        foreignKey: 'productId'
      }),
      Product.hasMany(models.Feedback, {
        foreignKey: 'productId'
      }),
      Product.hasMany(models.NewsDetails, {
        foreignKey: 'productId'
      })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    oldPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    image: DataTypes.TEXT,
    description: DataTypes.TEXT,
    specification: DataTypes.TEXT,
    buyturn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0
      }
    },
    brandId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products'
  });
  return Product;
};