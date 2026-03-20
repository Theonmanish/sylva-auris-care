import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/adminAuth";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await login(email, password);

    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect email or password. Please try again.");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <main className="admin-login">
      <div className="admin-login-card">

        <div className="admin-login-header">
          <p className="admin-eyebrow">Admin Access</p>
          <h1>Sylva Auris</h1>
          <p className="admin-login-sub">
            Restricted area. Authorised personnel only.
          </p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>

          <div className="admin-form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(null);
              }}
              autoComplete="off"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              autoComplete="off"
            />
          </div>

          {error && (
            <div className="admin-error">
              ⚠ {error}
            </div>
          )}

          <button
            type="submit"
            className="admin-login-btn"
            disabled={!email.trim() || !password.trim() || loading}
          >
            {loading ? "Signing in..." : "Enter Dashboard"}
          </button>

        </form>

        <a href="/" className="admin-back-link">
          ← Return to Care App
        </a>

      </div>
    </main>
  );
}

export default AdminLogin;