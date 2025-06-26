const express = require('express');
const router = express.Router();
const { SellerLoginValidation, CreateProductValidation, CreateBrandValidation, Pagination, DeleteProductValidation} = require('../validations/index');
const validateMiddleware = require('../middleware/validation-middleware');
const authMiddleware = require('../middleware/auth-middleware')
const controller = require('../controller/seller-controller');

router.get('/seller-login', validateMiddleware(SellerLoginValidation.SellerLogin), controller.sellerLogin);

router.post('/create-product', validateMiddleware(CreateProductValidation.addProduct), authMiddleware(['seller']), controller.createProduct);

router.post('/create-brand', validateMiddleware(CreateBrandValidation.addBrand), authMiddleware(['seller']), controller.createBrand);

router.get('/product-listing', validateMiddleware(Pagination.pagination), authMiddleware(['seller']), controller.productList);

router.delete('/product-delete', validateMiddleware(DeleteProductValidation.deleteProduct), authMiddleware(['seller']), controller.deleteProduct);


module.exports = router;
