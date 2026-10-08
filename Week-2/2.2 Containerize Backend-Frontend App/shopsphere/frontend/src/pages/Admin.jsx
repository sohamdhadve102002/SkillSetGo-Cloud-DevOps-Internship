import {
  useEffect,
  useState
} from "react";

import api from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

function Admin() {

  const { user } =
    useAuth();

  const [stats, setStats] =
    useState(null);

  const [orders, setOrders] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  const [form, setForm] =
    useState({
      name: "",
      description: "",
      price: "",
      stock: "",
      image_url: "",
      brand: "",
      category_id: "",
      rating: ""
    });

  const loadData = async () => {

    try {

      const [
        dashboardResponse,
        ordersResponse,
        productsResponse
      ] = await Promise.all([

        api.get(
          "/admin/dashboard"
        ),

        api.get(
          "/admin/orders"
        ),

        api.get(
          "/products"
        )

      ]);

      setStats(
        dashboardResponse.data
      );

      setOrders(
        ordersResponse.data
      );

      setProducts(
        productsResponse.data
      );

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    if (user?.role === "admin") {
      loadData();
    }

  }, [user]);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const createProduct =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/products",
          form
        );

        alert(
          "Product created successfully"
        );

        setForm({
          name: "",
          description: "",
          price: "",
          stock: "",
          image_url: "",
          brand: "",
          category_id: "",
          rating: ""
        });

        loadData();

      } catch (error) {

        alert(
          error.response?.data?.message ||
          "Failed to create product"
        );

      }
    };

  const deleteProduct =
    async (id) => {

      if (
        !window.confirm(
          "Delete this product?"
        )
      ) {
        return;
      }

      try {

        await api.delete(
          `/products/${id}`
        );

        loadData();

      } catch (error) {

        alert(
          "Delete failed"
        );

      }
    };

  const updateStatus =
    async (id, status) => {

      try {

        await api.put(
          `/admin/orders/${id}/status`,
          { status }
        );

        loadData();

      } catch (error) {

        alert(
          "Status update failed"
        );

      }
    };

  if (user?.role !== "admin") {

    return (
      <div className="empty-page">

        <h1>
          Access Denied
        </h1>

        <p>
          Admin access required.
        </p>

      </div>
    );
  }

  return (
    <div className="admin-container">

      <div className="admin-heading">

        <div>

          <span>
            SHOPSPHERE ADMIN
          </span>

          <h1>
            Dashboard
          </h1>

        </div>

      </div>

      {stats && (

        <div className="stats">

          <div className="stat-card">

            <span>
              Customers
            </span>

            <h2>
              {stats.users}
            </h2>

          </div>

          <div className="stat-card">

            <span>
              Products
            </span>

            <h2>
              {stats.products}
            </h2>

          </div>

          <div className="stat-card">

            <span>
              Orders
            </span>

            <h2>
              {stats.orders}
            </h2>

          </div>

          <div className="stat-card">

            <span>
              Revenue
            </span>

            <h2>
              ₹{Number(
                stats.revenue
              ).toLocaleString("en-IN")}
            </h2>

          </div>

        </div>

      )}

      <section className="admin-section">

        <h2>
          Add New Product
        </h2>

        <form
          className="product-form"
          onSubmit={createProduct}
        >

          <input
            name="name"
            placeholder="Product name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="brand"
            placeholder="Brand"
            value={form.brand}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <input
            name="category_id"
            type="number"
            placeholder="Category ID"
            value={form.category_id}
            onChange={handleChange}
          />

          <input
            name="rating"
            type="number"
            step="0.1"
            placeholder="Rating"
            value={form.rating}
            onChange={handleChange}
          />

          <input
            name="image_url"
            placeholder="Image URL"
            value={form.image_url}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <button
            className="primary-btn"
            type="submit"
          >
            Add Product
          </button>

        </form>

      </section>

      <section className="admin-section">

        <h2>
          Product Management
        </h2>

        <div className="admin-table-wrapper">

          <table>

            <thead>

              <tr>

                <th>ID</th>
                <th>Product</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {products.map(
                product => (

                  <tr key={product.id}>

                    <td>
                      #{product.id}
                    </td>

                    <td>
                      {product.name}
                    </td>

                    <td>
                      ₹{product.price}
                    </td>

                    <td>
                      {product.stock}
                    </td>

                    <td>

                      <button
                        className="remove-btn"
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>

      <section className="admin-section">

        <h2>
          Order Management
        </h2>

        <div className="admin-table-wrapper">

          <table>

            <thead>

              <tr>

                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update</th>

              </tr>

            </thead>

            <tbody>

              {orders.map(
                order => (

                  <tr key={order.id}>

                    <td>
                      #{order.id}
                    </td>

                    <td>
                      {order.customer_name}
                      <br />
                      <small>
                        {order.email}
                      </small>
                    </td>

                    <td>
                      ₹{order.total_amount}
                    </td>

                    <td>
                      {order.status}
                    </td>

                    <td>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order.id,
                            e.target.value
                          )
                        }
                      >

                        <option>
                          Pending
                        </option>

                        <option>
                          Processing
                        </option>

                        <option>
                          Shipped
                        </option>

                        <option>
                          Delivered
                        </option>

                        <option>
                          Cancelled
                        </option>

                      </select>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}

export default Admin;