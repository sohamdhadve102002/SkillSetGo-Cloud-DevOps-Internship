const pool = require("../config/db");

exports.getProducts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      sort = ""
    } = req.query;

    let sql = `
      SELECT
        p.*,
        c.name AS category_name
      FROM products p
      LEFT JOIN categories c
      ON p.category_id = c.id
      WHERE 1=1
    `;

    const params = [];

    if (search) {
      sql += `
        AND (
          p.name LIKE ?
          OR p.brand LIKE ?
        )
      `;

      params.push(
        `%${search}%`,
        `%${search}%`
      );
    }

    if (category) {
      sql += " AND p.category_id = ?";
      params.push(category);
    }

    if (sort === "low") {
      sql += " ORDER BY p.price ASC";
    } else if (sort === "high") {
      sql += " ORDER BY p.price DESC";
    } else if (sort === "rating") {
      sql += " ORDER BY p.rating DESC";
    } else {
      sql += " ORDER BY p.created_at DESC";
    }

    const [products] = await pool.query(
      sql,
      params
    );

    res.json(products);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const [products] = await pool.query(
      `
      SELECT
        p.*,
        c.name AS category_name
      FROM products p
      LEFT JOIN categories c
      ON p.category_id = c.id
      WHERE p.id = ?
      `,
      [req.params.id]
    );

    if (products.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(products[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error"
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      image_url,
      brand,
      category_id,
      rating
    } = req.body;

    const [result] = await pool.query(
      `
      INSERT INTO products
      (
        name,
        description,
        price,
        stock,
        image_url,
        brand,
        category_id,
        rating
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        description,
        price,
        stock,
        image_url,
        brand,
        category_id,
        rating || 0
      ]
    );

    res.status(201).json({
      message: "Product created",
      productId: result.insertId
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create product"
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      image_url,
      brand,
      category_id,
      rating
    } = req.body;

    await pool.query(
      `
      UPDATE products
      SET
        name = ?,
        description = ?,
        price = ?,
        stock = ?,
        image_url = ?,
        brand = ?,
        category_id = ?,
        rating = ?
      WHERE id = ?
      `,
      [
        name,
        description,
        price,
        stock,
        image_url,
        brand,
        category_id,
        rating,
        req.params.id
      ]
    );

    res.json({
      message: "Product updated"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product"
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await pool.query(
      "DELETE FROM products WHERE id = ?",
      [req.params.id]
    );

    res.json({
      message: "Product deleted"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product"
    });
  }
};