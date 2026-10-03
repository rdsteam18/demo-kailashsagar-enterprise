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

    // DEMO credentials only
    if (
      email.trim() === "admin@demo.local" &&
      password === "demo123"
    ) {
      saveAdminSession({
        email,
        loggedInAt: new Date().toISOString(),
      });

      navigate("/admin");
      return;
    }

    setError("Invalid demo credentials.");
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          KSE
        </div>

        <h1>Admin Login</h1>

        <p className="admin-login-subtitle">
          Kailash Sagar Enterprise
        </p>

        <form onSubmit={handleSubmit}>

          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="admin@demo.local"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            Login
          </button>

        </form>

        <div className="demo-credentials">
          <strong>Demo Credentials</strong>
          <span>admin@demo.local</span>
          <span>demo123</span>
        </div>

        <div className="admin-login-note">
          Demo only — no real authentication is connected.
        </div>

      </div>

    </div>
  );
}
