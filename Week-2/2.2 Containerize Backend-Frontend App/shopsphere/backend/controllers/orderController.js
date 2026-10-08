const pool = require("../config/db");

exports.createOrder = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const {
      items,
      shipping_address
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    await connection.beginTransaction();

    let total = 0;

    for (const item of items) {
      const [products] = await connection.query(
        "SELECT * FROM products WHERE id = ?",
        [item.product_id]
      );

      if (products.length === 0) {
        throw new Error(
          `Product ${item.product_id} not found`
        );
      }

      const product = products[0];

      if (product.stock < item.quantity) {
        throw new Error(
          `${product.name} has insufficient stock`
        );
      }

      total +=
        Number(product.price) *
        Number(item.quantity);
    }

    const [orderResult] = await connection.query(
      `
      INSERT INTO orders
      (
        user_id,
        total_amount,
        shipping_address
      )
      VALUES (?, ?, ?)
      `,
      [
        req.user.id,
        total,
        shipping_address
      ]
    );

    const orderId = orderResult.insertId;

    for (const item of items) {
      const [products] = await connection.query(
        "SELECT price FROM products WHERE id = ?",
        [item.product_id]
      );

      const price = products[0].price;

      await connection.query(
        `
        INSERT INTO order_items
        (
          order_id,
          product_id,
          quantity,
          price
        )
        VALUES (?, ?, ?, ?)
        `,
        [
          orderId,
          item.product_id,
          item.quantity,
          price
        ]
      );

      await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE id = ?
        `,
        [
          item.quantity,
          item.product_id
        ]
      );
    }

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully",
      orderId
    });

  } catch (error) {
    await connection.rollback();

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  } finally {
    connection.release();
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const [orders] = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.json(orders);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
};