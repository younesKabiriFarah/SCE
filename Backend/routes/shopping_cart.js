const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/session");

const {
  createCartItem,
  getCartsItem,
  deleteCartsItem,
} = require("../controllers/cart");

router.get("/getItems/:id", authMiddleware, getCartsItem);
router.post("/createItem", authMiddleware, createCartItem);
router.delete("/deleteItem/:id", authMiddleware, deleteCartsItem);

module.exports = router;
