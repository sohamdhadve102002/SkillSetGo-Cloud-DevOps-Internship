import {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import api from "../services/api";

function ProductDetails() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [product, setProduct] =
    useState(null);

  const [quantity, setQuantity] =
    useState(1);

  useEffect(() => {

    api.get(`/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [id]);

  const addToCart = () => {

    const existingCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existing =
      existingCart.find(
        item => item.id === product.id
      );

    let updatedCart;

    if (existing) {

      updatedCart =
        existingCart.map(item =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity
              }
            : item
        );

    } else {

      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity
        }
      ];

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart");

    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="loading">
        Loading product...
      </div>
    );
  }

  return (
    <div className="details-container">

      <div className="details-image">

        <img
          src={product.image_url}
          alt={product.name}
        />

      </div>

      <div className="details-content">

        <span>
          {product.category_name}
        </span>

        <h1>
          {product.name}
        </h1>

        <p className="brand">
          Brand: {product.brand}
        </p>

        <div className="big-rating">
          ★ {product.rating}
        </div>

        <h2>
          ₹{Number(
            product.price
          ).toLocaleString("en-IN")}
        </h2>

        <p>
          {product.description}
        </p>

        <p>
          Stock Available:
          <strong>
            {" "}
            {product.stock}
          </strong>
        </p>

        <div className="quantity">

          <button
            onClick={() =>
              setQuantity(
                Math.max(1, quantity - 1)
              )
            }
          >
            -
          </button>

          <span>
            {quantity}
          </span>

          <button
            onClick={() =>
              setQuantity(
                Math.min(
                  product.stock,
                  quantity + 1
                )
              )
            }
          >
            +
          </button>

        </div>

        <button
          className="primary-btn"
          disabled={product.stock === 0}
          onClick={addToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;