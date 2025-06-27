const { Sellers, Products } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function sellerLogin(req, res) {
    try {
        const { email, password } = req.body;

        const isSellerExist = await Sellers.findOne({
            where: {
                email,
                deleted_at: null
            },
            attributes: ['id', 'email', 'password']
        });

        if (!isSellerExist) {
            return res.status(404).json({
                msg: "Seller not found",
                data: {}
            });
        }

        const isMatch = bcrypt.compareSync(password, isSellerExist.password);

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid credentials",
                data: {},
            });
        }

        const payload = { id: isSellerExist.id, email: isSellerExist.email, role: 'seller' };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '3d' });

        return res.status(200).json({
            msg: "Login successful",
            data: {
                access_token: token,
                role: payload.role
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
}

async function createProduct(req, res) {
    try {
        const { body } = req;
        const { id } = req.user;

        await Products.create({
            product_name: body.product_name,
            product_description: body.product_description,
            seller_id: id,
            brands: JSON.stringify(body.brands),
        });

        return res.status(201).json({
            msg: 'Product created successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Failed to create product', error: err.message });
    }
}

async function productList(req, res) {
    try {
        const page = +req.query.page || 1;
        const limit = +req.query.limit || 10;
        const offset = (page - 1) * limit;

        const total = await Products.count({
            where: { deleted_at: null }
        });

        const products = await Products.findAll({
            where: { deleted_at: null },
            attributes: ['product_name', 'product_description', 'brands'],
            offset,
            limit,
            order: [['created_at', 'DESC']]
        });

        const result = products.map(p => ({
            ...p.toJSON(),
            brands: JSON.parse(p.brands || '[]')
        }));

        return res.status(200).json({
            msg: 'Product list fetched successfully',
            data: result,
            pagination: { page, limit, total }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: 'Failed to fetch product list',
            error: err.message
        });
    }
}


async function deleteProduct(req, res) {
    try {
        const { id } = req.user;
        const { query } = req;

        const product = await Products.findOne({
            where: {
                id: query.id,
                seller_id: id,
                deleted_at: null
            }
        });

        if (!product) {
            return res.status(404).json({
                msg: 'Product not found'
            });
        }

        await Products.update(
            { deleted_at: new Date() },
            { where: { id: query.id } }
        );

        return res.status(200).json({
            msg: 'Product deleted successfully'
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            msg: 'Failed to delete product',
            error: err.message
        });
    }
}

module.exports = {
    sellerLogin,
    createProduct,
    productList,
    deleteProduct,
}
