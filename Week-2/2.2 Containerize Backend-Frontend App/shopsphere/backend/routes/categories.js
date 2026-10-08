const express = require("express");

const router = express.Router();

const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {
    const [categories] = await pool.query(
      "SELECT * FROM categories ORDER BY name"
    );

    res.json(categories);

  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch categories"
    });
  }
});

module.exports = router;