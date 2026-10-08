import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import api from "../services/api";

function Register() {

  const navigate =
    useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: ""
    });

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
        e.target.value
    });

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await api.post(
          "/auth/register",
          form
        );

        alert(
          "Registration successful"
        );

        navigate("/login");

      } catch (error) {

        setError(
          error.response?.data?.message ||
          "Registration failed"
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
          Create Account
        </h1>

        <p>
          Join ShopSphere today.
        </p>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          minLength="6"
          required
        />

        <button
          className="primary-btn"
          type="submit"
        >
          Create Account
        </button>

        <p>
          Already registered?
          {" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </form>

    </div>
  );
}

export default Register;