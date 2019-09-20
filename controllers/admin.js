const Product = require("../models/product");

// GET /admin/add-product
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Products",
    path: "/admin/add-product",
    editing: false
  });
};

//  POST /admin/add-product
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(
    null, //  Setting Id as null, as we are creating a new product here
    title,
    imageUrl,
    description,
    price
  );

  product.save();
  res.redirect("/");
};

// GET /admin/edit-product/:productId/?editing
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;

  Product.findById(prodId, product => {
    if (!product) {
      res.redirect("/");
    }

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/products",
      editing: editMode,
      product: product
    });
  });
};

//  POST /admin/edit-product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImgUrl,
    updatedDesc,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

//  GET /admin/products
exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products =>
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      prods: products
    })
  );
};

//  POST /admin/delete-product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect("/admin/products");
};
