const express = require("express");

const router = express.Router();

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const {
  authenticateToken,
  adminOnly
} = require("../middleware/auth");

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(
  "/",
  authenticateToken,
  adminOnly,
  createProduct
);

router.put(
  "/:id",
  authenticateToken,
  adminOnly,
  updateProduct
);

router.delete(
  "/:id",
  authenticateToken,
  adminOnly,
  deleteProduct
);

module.exports = router;