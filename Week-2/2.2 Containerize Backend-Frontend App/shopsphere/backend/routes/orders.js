const express = require("express");

const router = express.Router();

const {
  authenticateToken
} = require("../middleware/auth");

const {
  createOrder,
  getMyOrders
} = require("../controllers/orderController");

router.post(
  "/",
  authenticateToken,
  createOrder
);

router.get(
  "/my",
  authenticateToken,
  getMyOrders
);

module.exports = router;