const Product = require('../models/product');

// GET /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    title: 'Add Products',
    path: '/admin/add-product'
  });
};

//  POST /admin/add-product
exports.postAddProduct = (req, res, next) => {
  const title       = req.body.title;
  const imageUrl    = req.body.imageUrl;
  const price       = req.body.price;
  const description = req.body.description;

  const product = new Product(
    title,
    imageUrl,
    description,
    price
  );

  product.save();
  res.redirect('/');
};

//  GET /admin/products
exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products =>
    res.render('admin/products', {
      title: 'Admin Products',
      path: '/admin/products',
      products: products
    })
  );
};
