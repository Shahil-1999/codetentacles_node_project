const { DataTypes } = require('sequelize')
const { sequelize } = require('../connections/connection')
const table = require('../constant/constant')
const Seller = require('./sellers')
// const Skill = require('./skills')
const SellerSkillAssociation = sequelize.define(table.DB_TABLES.SELLER_SKILL_ASSOCIATIONS, {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    seller_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
    },
    skills: {
        type: DataTypes.STRING(255),
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
    tableName: table.DB_TABLES.SELLER_SKILL_ASSOCIATIONS
})

// Associations

SellerSkillAssociation.belongsTo(Seller, {
    foreignKey: 'seller_id',
});

Seller.hasMany(SellerSkillAssociation, {
    foreignKey: 'seller_id',
});
module.exports = SellerSkillAssociation