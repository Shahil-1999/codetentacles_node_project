const { DataTypes } = require('sequelize')
const { sequelize } = require('../connections/connection')
const table = require('../constant/constant')
const Admin = sequelize.define(table.DB_TABLES.ADMIN, {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
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
    tableName: table.DB_TABLES.ADMIN
})
module.exports = Admin