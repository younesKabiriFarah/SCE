const express = require("express");
const router = express.Router();
const { validatorCreatProduct } = require("../validators/product");
const {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByCategory,
  getProductBySome,
  getProductPrice,
} = require("../controllers/products");

router.get("/", getProducts);
router.get("/:id", getProduct);
router.get("/caterory/:category", getProductByCategory);
router.get("/search/:value", getProductBySome);
router.get("/price/:value", getProductPrice);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
