const express = require('express');
const router = express.Router();

// Import validation schemas
const { AdminValidation, CreateSellerValidation, Pagination } = require('../validations/index');

// Import middleware
const validateMiddleware = require('../middleware/validation-middleware');
const authMiddleware = require('../middleware/auth-middleware')

// Import controller functions
const {AdminController} = require('../controller/index');

/**
 * @route   POST /add-admin
 * @desc    Create a new admin
 * @access  Public
 * @validates AdminValidation.admin
 */
router.post('/add-admin', validateMiddleware(AdminValidation.admin), AdminController.admin);

/**
 * @route   GET /admin-login
 * @desc    Admin login
 * @access  Public
 * @validates AdminValidation.admin
 */
router.get('/admin-login', validateMiddleware(AdminValidation.admin), AdminController.adminLogin);

/**
 * @route   POST /seller-create
 * @desc    Create a new seller (admin only)
 * @access  Protected (admin only)
 * @validates CreateSellerValidation.createSeller
 */
router.post('/seller-create', validateMiddleware(CreateSellerValidation.createSeller), authMiddleware(['admin']), AdminController.createSeller);

/**
 * @route   GET /sellers-listing
 * @desc    Get list of all sellers with pagination
 * @access  Protected (admin only)
 * @validates Pagination.pagination
 */
router.get('/sellers-listing', validateMiddleware(Pagination.pagination), authMiddleware(['admin']), AdminController.listSellers);

module.exports = router;
