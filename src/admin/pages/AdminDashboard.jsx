import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/adminAuth";
import TerrariumForm from "../components/TerrariumForm";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [terrariums, setTerrariums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  // Load terrariums from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("sylva_terrariums");
    if (stored) {
      setTerrariums(JSON.parse(stored));
    }
  }, []);

  const handleAdd = (newTerrarium) => {
    const updated = [...terrariums, newTerrarium];
    setTerrariums(updated);
    localStorage.setItem("sylva_terrariums", JSON.stringify(updated));
    setShowForm(false);
  };

  const handleDelete = (id) => {
    const updated = terrariums.filter((t) => t.id !== id);
    setTerrariums(updated);
    localStorage.setItem("sylva_terrariums", JSON.stringify(updated));
  };

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  return (
    <div className="admin-dashboard">

      {/* Top Bar */}
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <div>
            <p className="admin-topbar-label">Admin Panel</p>
            <h1 className="admin-topbar-title">Sylva Auris</h1>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </header>

      <main className="admin-main">

        {/* Stats Row */}
        <div className="admin-stats">
          <div className="admin-stat-card">
            <p className="stat-label">Total Terrariums</p>
            <p className="stat-value">{terrariums.length}</p>
          </div>
          <div className="admin-stat-card">
            <p className="stat-label">Published</p>
            <p className="stat-value">
              {terrariums.filter((t) => t.status === "live").length}
            </p>
          </div>
          <div className="admin-stat-card">
            <p className="stat-label">Drafts</p>
            <p className="stat-value">
              {terrariums.filter((t) => t.status === "draft").length}
            </p>
          </div>
        </div>

        {/* Section Header */}
        <div className="admin-section-header">
          <h2>Terrarium Records</h2>
          <button
            className="admin-add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Cancel" : "+ Add Terrarium"}
          </button>
        </div>

        {/* Add Form */}
        {showForm && (
          <TerrariumForm onSubmit={handleAdd} />
        )}

        {/* Terrarium List */}
        {terrariums.length === 0 ? (
          <div className="admin-empty">
            <p>No terrarium records yet.</p>
            <p className="admin-empty-sub">
              Add your first terrarium using the button above.
            </p>
          </div>
        ) : (
          <div className="admin-terrarium-list">
            {terrariums.map((t) => (
              <div key={t.id} className="admin-terrarium-card">
                <div className="admin-terrarium-info">
                  <div>
                    <p className="admin-terrarium-name">{t.name}</p>
                    <p className="admin-terrarium-id">{t.id}</p>
                  </div>
                  <span className={`admin-status-badge ${t.status}`}>
                    {t.status}
                  </span>
                </div>
                <div className="admin-terrarium-meta">
                  <span>{t.ecosystem}</span>
                  <span>{t.type}</span>
                </div>
                <div className="admin-terrarium-actions">
                  <button
                    className="admin-action-btn delete"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;