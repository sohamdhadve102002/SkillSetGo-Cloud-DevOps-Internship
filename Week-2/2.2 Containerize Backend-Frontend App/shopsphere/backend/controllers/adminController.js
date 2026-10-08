const pool = require("../config/db");

exports.dashboard = async (req, res) => {
  try {
    const [[users]] = await pool.query(
      "SELECT COUNT(*) AS total FROM users"
    );

    const [[products]] = await pool.query(
      "SELECT COUNT(*) AS total FROM products"
    );

    const [[orders]] = await pool.query(
      "SELECT COUNT(*) AS total FROM orders"
    );

    const [[revenue]] = await pool.query(
      `
      SELECT
        COALESCE(SUM(total_amount), 0) AS total
      FROM orders
      WHERE status != 'Cancelled'
      `
    );

    res.json({
      users: users.total,
      products: products.total,
      orders: orders.total,
      revenue: revenue.total
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Dashboard error"
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      `
      SELECT
        o.*,
        u.name AS customer_name,
        u.email
      FROM orders o
      JOIN users u
      ON o.user_id = u.id
      ORDER BY o.created_at DESC
      `
    );

    res.json(orders);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    await pool.query(
      `
      UPDATE orders
      SET status = ?
      WHERE id = ?
      `,
      [
        status,
        req.params.id
      ]
    );

    res.json({
      message: "Order status updated"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update order"
    });
  }
};