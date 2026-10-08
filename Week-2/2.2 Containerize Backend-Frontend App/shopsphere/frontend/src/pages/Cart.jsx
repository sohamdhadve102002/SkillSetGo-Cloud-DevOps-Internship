import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

function Cart() {

  const navigate =
    useNavigate();

  const { user } =
    useAuth();

  const [cart, setCart] =
    useState([]);

  const [address, setAddress] =
    useState("");

  useEffect(() => {

    const saved =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(saved);

  }, []);

  const saveCart = (updated) => {

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  const updateQuantity =
    (id, change) => {

      const updated =
        cart.map(item => {

          if (item.id !== id) {
            return item;
          }

          const newQuantity =
            item.quantity + change;

          return {
            ...item,
            quantity:
              Math.max(
                1,
                Math.min(
                  item.stock,
                  newQuantity
                )
              )
          };

        });

      saveCart(updated);
    };

  const removeItem = (id) => {

    const updated =
      cart.filter(
        item => item.id !== id
      );

    saveCart(updated);
  };

  const total =
    cart.reduce(
      (sum, item) =>
        sum +
        Number(item.price) *
        item.quantity,
      0
    );

  const checkout = async () => {

    if (!user) {

      alert(
        "Please login before checkout."
      );

      navigate("/login");

      return;
    }

    if (!address.trim()) {

      alert(
        "Please enter shipping address."
      );

      return;
    }

    try {

      await api.post(
        "/orders",
        {
          shipping_address:
            address,

          items:
            cart.map(item => ({
              product_id:
                item.id,

              quantity:
                item.quantity
            }))
        }
      );

      localStorage.removeItem(
        "cart"
      );

      setCart([]);

      alert(
        "Order placed successfully!"
      );

      navigate("/orders");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Checkout failed"
      );

    }
  };

  if (cart.length === 0) {

    return (
      <div className="empty-page">

        <h1>
          Your Cart is Empty
        </h1>

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/products")
          }
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  return (
    <div className="page-container">

      <h1>
        Shopping Cart
      </h1>

      <div className="cart-layout">

        <div className="cart-items">

          {cart.map(item => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image_url}
                alt={item.name}
              />

              <div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{Number(
                    item.price
                  ).toLocaleString("en-IN")}
                </p>

                <div className="quantity">

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        -1
                      )
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        1
                      )
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeItem(item.id)
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

        <div className="checkout-card">

          <h2>
            Order Summary
          </h2>

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>

          </div>

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <strong>
              FREE
            </strong>

          </div>

          <hr />

          <div className="summary-row">

            <strong>
              Total
            </strong>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>

          </div>

          <textarea
            placeholder="Enter complete shipping address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
          />

          <button
            className="primary-btn"
            onClick={checkout}
          >
            Place Order
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;