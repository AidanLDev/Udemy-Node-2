const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

//  GET /admin/add-product
router.get('/add-product', adminController.getAddProduct);

//  POST /admin/add-product
router.post('/add-product', adminController.postAddProduct);

//  GET /admin/products
router.get('/products', adminController.getAdminProducts);

//  GET /admin/edit-product/:productId?edit=
router.get('/edit-product/:productId', adminController.getEditProduct);

//  POST /admin/edit-product
router.post('/edit-product', adminController.postEditProduct)

//  POST /admin/delete-product
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
