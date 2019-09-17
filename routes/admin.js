const path = require('path');
const express = require('express');
const rootDir = require('../util/path');
const router = express.Router();

const products = [];

// GET /admin/add-product
router.get('/add-product', (req, res, next) => {
  res.render('pugViews/add-product', { title: 'Add Products', path: '/admin/add-product' });
});

// POST /admin/add-product
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
