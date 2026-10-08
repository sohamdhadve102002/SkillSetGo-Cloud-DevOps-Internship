import {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function Orders() {

  const navigate =
    useNavigate();

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    api.get("/orders/my")
      .then((response) => {
        setOrders(response.data);
      })
      .catch(() => {
        navigate("/login");
      });

  }, []);

  return (
    <div className="page-container">

      <h1>
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="empty-page">

          <h2>
            No orders yet.
          </h2>

          <button
            className="primary-btn"
            onClick={() =>
              navigate("/products")
            }
          >
            Start Shopping
          </button>

        </div>

      ) : (

        <div className="orders">

          {orders.map(order => (

            <div
              className="order-card"
              key={order.id}
            >

              <div>

                <h3>
                  Order #{order.id}
                </h3>

                <p>
                  {new Date(
                    order.created_at
                  ).toLocaleString()}
                </p>

              </div>

              <div>

                <strong>
                  ₹{Number(
                    order.total_amount
                  ).toLocaleString("en-IN")}
                </strong>

                <span
                  className={`status ${order.status.toLowerCase()}`}
                >
                  {order.status}
                </span>

              </div>

              <p>
                {order.shipping_address}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;