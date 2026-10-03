import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveAdminSession } from "../../utils/storage";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    if (
      (email.trim().toLowerCase() === "admin" || email.trim() === "admin@kailashsagarenterprise.com") &&
      password === "admin@123456789"
    ) {
      saveAdminSession({
        email,
        loggedInAt: new Date().toISOString(),
      });

      navigate("/admin");
      return;
    }

    setError("Invalid admin credentials.");
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          KS
        </div>

        <h1>Admin Portal</h1>

        <p className="admin-login-subtitle">
          Kailash Sagar Enterprise
        </p>

        <form onSubmit={handleSubmit}>

          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter admin username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-button"
          >
            Login to Admin Dashboard
          </button>

        </form>

      </div>

    </div>
  );
}
