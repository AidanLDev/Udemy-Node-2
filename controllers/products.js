const Product = require('../models/product');

// GET /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    title: 'Add Products',
    path: '/admin/add-product'
  });
};

//  POST /admin/add-product
exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.save();
  res.redirect('/');
};

//  GET /
exports.getProducts = (req, res, next) => {
  const products = Product.fetchAll();
  res.render('shop', {
    products: products,
    title: 'Shop',
    path: '/',
    hasProducts: products.length > 0
  });
}