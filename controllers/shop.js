const Product = require('../models/product');



//  GET /products
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      products: products,
      title: 'All Products',
      path: '/products'
    });
  });
}

//  GET /
exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      products: products,
      title: 'Shop',
      path: '/'
    });
  });
}

//  GET /cart
exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    title: 'Your Cart',
    path: '/cart'
  });
};

//  GET /orders
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    title: 'Your Orders',
    path: '/orders'
  })
}

//  GET /checkout
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    title: 'Checkout',
    path: '/checkout'
  });
}