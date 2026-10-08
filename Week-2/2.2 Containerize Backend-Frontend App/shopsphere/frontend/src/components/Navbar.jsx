import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useAuth
} from "../context/AuthContext";

function Navbar() {

  const {
    user,
    logout
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link
        to="/"
        className="logo"
      >
        ShopSphere
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        {user && (
          <Link to="/orders">
            My Orders
          </Link>
        )}

        <Link to="/cart">
          Cart
        </Link>

        {user?.role === "admin" && (
          <Link to="/admin">
            Admin
          </Link>
        )}

        {user ? (
          <>
            <span className="welcome">
              Hi, {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link
              to="/register"
              className="nav-register"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;