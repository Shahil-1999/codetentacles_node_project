const express = require('express');
const router = express.Router();
const { SellerLoginValidation, CreateProductValidation, CreateBrandValidation, Pagination, DeleteProductValidation} = require('../validations/index');
const validateMiddleware = require('../middleware/validation-middleware');
const authMiddleware = require('../middleware/auth-middleware')
const {SellerController} = require('../controller/index');

router.get('/seller-login', validateMiddleware(SellerLoginValidation.SellerLogin), SellerController.sellerLogin);

router.post('/create-product', validateMiddleware(CreateProductValidation.addProduct), authMiddleware(['seller']), SellerController.createProduct);

router.get('/product-listing', validateMiddleware(Pagination.pagination), authMiddleware(['seller']), SellerController.productList);

router.delete('/product-delete', validateMiddleware(DeleteProductValidation.deleteProduct), authMiddleware(['seller']), SellerController.deleteProduct);


module.exports = router;
