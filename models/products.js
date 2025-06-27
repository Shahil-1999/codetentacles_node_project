const { DataTypes } = require('sequelize')
const { sequelize } = require('../connections/connection')
const table = require('../constant/constant')
const Seller = require('./sellers')
const Product = sequelize.define(table.DB_TABLES.PRODUCTS, {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    product_description: {
        type: DataTypes.TEXT('long'),
        allowNull: true,
    },
    seller_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    brands: {
        type: DataTypes.TEXT,
        allowNull: true
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
    tableName: table.DB_TABLES.PRODUCTS
})

Product.belongsTo(Seller, {
    foreignKey: 'seller_id',
});

Seller.hasMany(Product, {
    foreignKey: 'seller_id',
});

module.exports = Product