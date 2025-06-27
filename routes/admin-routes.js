const express = require('express');
const router = express.Router();
const { AdminValidation, CreateSellerValidation, Pagination } = require('../validations/index');
const validateMiddleware = require('../middleware/validation-middleware');
const authMiddleware = require('../middleware/auth-middleware')
const {AdminController} = require('../controller/index');

router.post('/add-admin', validateMiddleware(AdminValidation.admin), AdminController.admin);
router.get('/admin-login', validateMiddleware(AdminValidation.admin), AdminController.adminLogin);
router.post('/seller-create', validateMiddleware(CreateSellerValidation.createSeller), authMiddleware(['admin']), AdminController.createSeller);
router.get('/sellers-listing', validateMiddleware(Pagination.pagination), authMiddleware(['admin']), AdminController.listSellers);

module.exports = router;
