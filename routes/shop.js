const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

//  GET /
router.get("/", shopController.getIndex);

//  GET /products
router.get("/products", shopController.getProducts);

//  GET /products/:productId (colon signals to express it should look for a variable)
router.get("/products/:productId", shopController.getProduct);

//  GET /cart
router.get("/cart", shopController.getCart);

//  POST /cart
router.post("/cart", shopController.postCart);

//  GET /orders
router.get("/orders", shopController.getOrders);

//  POST /create-order
router.post("/create-order", shopController.postOrder);

//  POST /cart-delete-item
router.post("/cart-delete-item", shopController.postCartDeleteProduct);

module.exports = router;
