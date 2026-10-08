import {
  Link
} from "react-router-dom";

function ProductCard({ product }) {

  return (
    <div className="product-card">

      <img
        src={product.image_url}
        alt={product.name}
      />

      <div className="product-info">

        <small>
          {product.category_name}
        </small>

        <h3>
          {product.name}
        </h3>

        <p className="brand">
          {product.brand}
        </p>

        <div className="rating">
          ★ {product.rating}
        </div>

        <h2>
          ₹{Number(product.price).toLocaleString("en-IN")}
        </h2>

        <p>
          {product.stock > 0
            ? `${product.stock} available`
            : "Out of stock"}
        </p>

        <Link
          to={`/products/${product.id}`}
          className="view-btn"
        >
          View Product
        </Link>

      </div>

    </div>
  );
}

export default ProductCard;