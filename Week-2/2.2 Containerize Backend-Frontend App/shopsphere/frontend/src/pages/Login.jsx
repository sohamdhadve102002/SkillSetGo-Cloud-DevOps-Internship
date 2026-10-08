import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import api from "../services/api";

import {
  useAuth
} from "../context/AuthContext";

function Login() {

  const navigate =
    useNavigate();

  const { login } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const response =
          await api.post(
            "/auth/login",
            {
              email,
              password
            }
          );

        login(response.data);

        if (
          response.data.user.role ===
          "admin"
        ) {

          navigate("/admin");

        } else {

          navigate("/products");

        }

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Login failed"
        );

      }
    };

  return (
    <div className="auth-page">

      <form
        className="auth-card"
        onSubmit={handleSubmit}
      >

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to your ShopSphere account.
        </p>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button
          className="primary-btn"
          type="submit"
        >
          Login
        </button>

        <p>
          Don't have an account?
          {" "}
          <Link to="/register">
            Register
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Login;