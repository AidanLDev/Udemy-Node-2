const products = [];

// GET /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    title: 'Add Products',
    path: '/admin/add-product'
  });
};

//  POST /admin/add-product
exports.postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};
