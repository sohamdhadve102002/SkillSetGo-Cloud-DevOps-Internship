import {
  Link
} from "react-router-dom";

function Home() {

  return (
    <>

      <section className="hero">

        <div className="hero-content">

          <span>
            SMART SHOPPING PLATFORM
          </span>

          <h1>
            Everything You Need,
            <br />
            In One Place.
          </h1>

          <p>
            Discover quality products,
            manage your orders and enjoy
            a smooth shopping experience.
          </p>

          <Link
            to="/products"
            className="hero-btn"
          >
            Explore Products
          </Link>

        </div>

      </section>

      <section className="features">

        <div>
          <h3>🚚 Fast Delivery</h3>
          <p>
            Reliable and quick delivery.
          </p>
        </div>

        <div>
          <h3>🔐 Secure Account</h3>
          <p>
            JWT protected authentication.
          </p>
        </div>

        <div>
          <h3>📦 Easy Orders</h3>
          <p>
            Track your orders easily.
          </p>
        </div>

        <div>
          <h3>💳 Secure Shopping</h3>
          <p>
            Simple and reliable checkout.
          </p>
        </div>

      </section>

    </>
  );
}

export default Home;