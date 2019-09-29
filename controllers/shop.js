const Product = require("../models/product");
const Cart = require("../models/cart");

//  GET /products
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([table, metaData]) => {
      res.render("shop/product-list", {
        prods: table,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(err => {
      console.error(err);
    });
};

//  GET /products/:productId
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findById(prodId)
    .then(([product]) => {
      console.log(product);
      res.render("shop/product-detail", {
        product: product[0],
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => {
      console.error(err);
    });
};

//  GET /
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([table, metaData]) => {
      res.render("shop/index", {
        prods: table,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(err => {
      console.error(err);
    });
};

//  GET /cart
exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      //  Only get products in the cart
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        products: cartProducts
      });
    });
  });
};

//  POST /cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

//  GET /orders
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders"
  });
};

//  GET /checkout
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout"
  });
};

//  POST /cart-delete-item
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};
