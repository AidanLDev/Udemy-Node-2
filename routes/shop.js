const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();
//  GET /
router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop', {
    products: products,
    title: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
  });
});

module.exports = router;
