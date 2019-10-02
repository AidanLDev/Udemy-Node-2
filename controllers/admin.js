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
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(result => {
      // console.log(result);
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch(err => {
      console.log(err);
    });
};

// GET /admin/edit-product/:productId/?editing
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }

  // findByPk()
  // Product.findByPk(prodId)
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/products",
        editing: editMode,
        product: product
      });
    })
    .catch(err => console.error(err));
};

//  POST /admin/edit-product
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImgUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImgUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then(result => {
      console.log("Updated prod");
      res.redirect("/admin/products");
    })
    .catch(err => console.error(err));
};

//  GET /admin/products
exports.getAdminProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products =>
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        prods: products
      })
    )
    .catch(err => console.error(err));
};

//  POST /admin/delete-product
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(prod => {
      return prod.destroy();
    })
    .then(() => {
      console.log("Destroyed prod");
      res.redirect("/admin/products");
    })
    .catch(err => console.error(err));
};
