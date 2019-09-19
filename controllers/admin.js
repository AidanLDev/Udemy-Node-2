const Product = require('../models/product');

// GET /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Products',
    path: '/admin/add-product',
    editing: false
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

// GET /admin/edit-product
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect('/');
  };

  const prodId = req.params.productId

  Product.findById(prodId, product => {
    if (!product) {
      res.redirect('/');
    };

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/products',
      editing: editMode,
      product: product
    });
  });

};

//  GET /admin/products
exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products =>
    res.render('admin/products', {
      pageTitle: 'Admin Products',
      path: '/admin/products',
      prods: products
    })
  );
};
