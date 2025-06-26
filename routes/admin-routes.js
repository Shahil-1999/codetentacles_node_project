const express = require('express');
const router = express.Router();
const { AdminValidation, CreateSellerValidation, Pagination } = require('../validations/index');
const validateMiddleware = require('../middleware/validation-middleware');
const authMiddleware = require('../middleware/auth-middleware')
const controller = require('../controller/admin-controller');

router.post('/add-admin', validateMiddleware(AdminValidation.admin), controller.admin);
router.get('/admin-login', validateMiddleware(AdminValidation.admin), controller.adminLogin);
router.post('/seller-create', validateMiddleware(CreateSellerValidation.createSeller), authMiddleware(['admin']), controller.createSeller);
router.get('/sellers-listing', validateMiddleware(Pagination.pagination), authMiddleware(['admin']), controller.listSellers);

module.exports = router;
