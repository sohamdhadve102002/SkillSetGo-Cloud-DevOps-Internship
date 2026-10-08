const express = require("express");

const router = express.Router();

const {
  authenticateToken,
  adminOnly
} = require("../middleware/auth");

const {
  dashboard,
  getAllOrders,
  updateOrderStatus
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  authenticateToken,
  adminOnly,
  dashboard
);

router.get(
  "/orders",
  authenticateToken,
  adminOnly,
  getAllOrders
);

router.put(
  "/orders/:id/status",
  authenticateToken,
  adminOnly,
  updateOrderStatus
);

module.exports = router;