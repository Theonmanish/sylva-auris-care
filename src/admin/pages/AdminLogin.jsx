import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/adminAuth";
import "./AdminLogin.css";

function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = login(password);

    if (success) {
      navigate("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
      setPassword("");
    }
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
              autoComplete="current-password"
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
            disabled={!password.trim()}
          >
            Enter Dashboard
          </button>
        </form>

        
         <a  href="/"
          className="admin-back-link"
        >
          ← Return to Care App
        </a>

      </div>
    </main>
  );
}

export default AdminLogin;
