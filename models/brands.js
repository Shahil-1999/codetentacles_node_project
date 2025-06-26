const { DataTypes } = require('sequelize')
const { sequelize } = require('../connections/connection')
const table = require('../constant/constant')
const Product = require('../models/products')
const Brand = sequelize.define(table.DB_TABLES.BRANDS, {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    details: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    image: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    product_id:{
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    deleted_at: {
        allowNull: true,
        type: DataTypes.DATE
    }
}, {
    tableName: table.DB_TABLES.BRANDS
})

// Associations
Brand.belongsTo(Product, {
  foreignKey: 'product_id',
});

Product.hasMany(Brand, {
  foreignKey: 'product_id',
});

module.exports = Brand