const express = require('express');
const router = express.Router();
// Import validation schemas
const { SellerLoginValidation, CreateProductValidation, CreateBrandValidation, Pagination, DeleteProductValidation} = require('../validations/index');

// Import middlewares
const validateMiddleware = require('../middleware/validation-middleware');
const authMiddleware = require('../middleware/auth-middleware')

// Import controller functions
const {SellerController} = require('../controller/index');

/**
 * @route   GET /seller-login
 * @desc    Seller login
 * @access  Public
 * @validates SellerLoginValidation.SellerLogin
 */
router.get('/seller-login', validateMiddleware(SellerLoginValidation.SellerLogin), SellerController.sellerLogin);

/**
 * @route   POST /create-product
 * @desc    Create a new product
 * @access  Protected (seller only)
 * @validates CreateProductValidation.addProduct
 */
router.post('/create-product', validateMiddleware(CreateProductValidation.addProduct), authMiddleware(['seller']), SellerController.createProduct);

/**
 * @route   GET /product-listing
 * @desc    Get list of all products (paginated)
 * @access  Protected (seller only)
 * @validates Pagination.pagination
 */
router.get('/product-listing', validateMiddleware(Pagination.pagination), authMiddleware(['seller']), SellerController.productList);

/**
 * @route   DELETE /product-delete
 * @desc    Soft delete a product
 * @access  Protected (seller only)
 * @validates DeleteProductValidation.deleteProduct
 */
router.delete('/product-delete', validateMiddleware(DeleteProductValidation.deleteProduct), authMiddleware(['seller']), SellerController.deleteProduct);


module.exports = router;
