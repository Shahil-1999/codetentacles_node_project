const { Admin, Sellers, SellerSkillAssociations } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function admin(req, res) {
    try {
        const { body } = req

        const isAdminExist = await Admin.findOne({
            where: {
                email: body.email,
                deleted_at: null
            },
            attributes: ['email'],
            raw: true,
        });

        if (isAdminExist) {
            return res.status(409).send({
                msg: "Admin already exists",
                data: {}
            });
        }

        const hashPassword = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10));
        const adminData = await Admin.create({
            email: body.email,
            password: hashPassword
        });

        if (adminData) {
            return res.status(201).send({
                msg: "Admin created successfully",
            });
        } else {
            return res.status(500).send({
                msg: "Failed to save admin",
                data: {}
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Internal server error",
            error: err.message,
        });
    }
}

async function adminLogin(req, res) {
    try {
        const { email, password } = req.body;

        const isAdminExist = await Admin.findOne({
            where: {
                email,
                deleted_at: null,
            },
            attributes: ['id', 'email', 'password'],
        });

        if (!isAdminExist) {
            return res.status(404).json({
                msg: "Admin not found",
                data: {},
            });
        }

        const isMatch = bcrypt.compareSync(password, isAdminExist.password);

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid credentials",
                data: {},
            });
        }

        const payload = { id: isAdminExist.id, email: isAdminExist.email, role: 'admin' };

        const token = jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: '3d' }
        );

        return res.status(200).json({
            msg: "Login successful",
            data: {
                access_token: token,
                role: payload.role
            },
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Internal server error",
            error: err.message,
        });
    }
}

async function createSeller(req, res) {
    try {
        const { name, email, mobile, country, state, password, skills } = req.body;

        const isSellerExist = await Sellers.findOne({
            where: {
                email,
                deleted_at: null
            },
            attributes: ['email']
        });

        if (isSellerExist) {
            return res.status(409).json({
                msg: "Seller already exists",
                data: {},
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const seller = await Sellers.create({
            name,
            email,
            mobile,
            country,
            state,
            password: hashedPassword
        });

        if (Array.isArray(skills) && skills?.length > 0) {
            const skillSet = skills.map((skills) => ({
                skills,
                seller_id: seller.id,
            }));
            await SellerSkillAssociations.bulkCreate(skillSet);
        }

        return res.status(201).json({
            msg: 'Seller created successfully'
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Internal server error',
            error: err.message
        });
    }
}

async function listSellers(req, res) {
    try {
        const { query } = req
        const page = +(query.page) || 1;
        const limit = +(query.limit) || 10;
        const offset = (page - 1) * limit;

        const total = await Sellers.count({
            where: {
                deleted_at: null
            }
        });

        const sellers = await Sellers.findAll({
            where: { deleted_at: null },
            include: [
                {
                    model: SellerSkillAssociations,
                    required: false,
                    attributes: ['skills']
                }
            ],
            offset,
            limit,
        });

        return res.status(200).json({
            msg: 'Sellers fetched successfully',
            data: sellers,
            pagination: {
                page,
                limit,
                total
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Internal server error',
            error: err.message
        });
    }
}

module.exports = {
    admin,
    adminLogin,
    createSeller,
    listSellers
}
