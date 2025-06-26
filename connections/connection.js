const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise')
require('dotenv').config()


// create db connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.DB_DIALECT,
    logging: false,
    define: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
    },
})

async function databaseConnection() {
    try {
        await sequelize.authenticate()
        console.log('db connection successfully');
    } catch (error) {
        console.log('unable to connect database', error);
    }
}

module.exports = {
    databaseConnection,
    sequelize
}