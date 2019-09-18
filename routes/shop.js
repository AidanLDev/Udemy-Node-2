const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

//  GET /
router.get('/', productsController.getProducts);

module.exports = router;
