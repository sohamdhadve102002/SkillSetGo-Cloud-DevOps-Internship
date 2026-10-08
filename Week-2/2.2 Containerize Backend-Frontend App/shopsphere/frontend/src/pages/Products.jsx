import {
  useEffect,
  useState
} from "react";

import ProductCard
  from "../components/ProductCard";

import api from "../services/api";

function Products() {

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [sort, setSort] =
    useState("");

  const fetchProducts = async () => {

    try {

      const response =
        await api.get("/products", {
          params: {
            search,
            category,
            sort
          }
        });

      setProducts(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  const fetchCategories = async () => {

    try {

      const response =
        await api.get("/categories");

      setCategories(response.data);

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    fetchCategories();

  }, []);

  useEffect(() => {

    fetchProducts();

  }, [
    search,
    category,
    sort
  ]);

  return (
    <div className="page-container">

      <div className="page-heading">

        <div>

          <span>
            SHOPSPHERE STORE
          </span>

          <h1>
            Explore Products
          </h1>

        </div>

      </div>

      <div className="filters">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="">
            All Categories
          </option>

          {categories.map(
            (cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            )
          )}

        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >

          <option value="">
            Sort By
          </option>

          <option value="low">
            Price: Low to High
          </option>

          <option value="high">
            Price: High to Low
          </option>

          <option value="rating">
            Highest Rated
          </option>

        </select>

      </div>

      <div className="product-grid">

        {products.length > 0 ? (

          products.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            )
          )

        ) : (

          <div className="empty">
            No products found.
          </div>

        )}

      </div>

    </div>
  );
}

export default Products;