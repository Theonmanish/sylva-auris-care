import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/adminAuth";
import TerrariumForm from "../components/TerrariumForm";
import "./AdminDashboard.css";
import {
  fetchAllTerrariums,
  createTerrarium,
  updateTerrarium,
  deleteTerrarium,
} from "../../api/supabaseApi";


function AdminDashboard() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [terrariums, setTerrariums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTerrarium, setEditingTerrarium] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllTerrariums()
      .then((data) => {
        const normalized = data.map((t) => ({
          ...t,
          commonProblems: t.common_problems || [],
        }));
        setTerrariums(normalized);
      })
      .catch(() => {
        setTerrariums([]);
      });
  }, []);

  const saveToStorage = (updated) => {
    setTerrariums(updated);
    localStorage.setItem("sylva_terrariums", JSON.stringify(updated));
  };

  const handleAdd = async (newTerrarium) => {
    try {
      const saved = await createTerrarium(newTerrarium);
      const normalized = {
        ...saved,
        commonProblems: saved.common_problems || [],
      };
      setTerrariums((prev) => [normalized, ...prev]);
      setShowForm(false);
      setSuccessMessage("Terrarium saved successfully.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      alert("Failed to save terrarium. Please try again.");
    }
  };
  const handleEdit = async (updatedTerrarium) => {
    try {
      const saved = await updateTerrarium(updatedTerrarium);
      const normalized = {
        ...saved,
        commonProblems: saved.common_problems || [],
      };
      setTerrariums((prev) =>
        prev.map((t) => (t.id === normalized.id ? normalized : t))
      );
      setEditingTerrarium(null);
      setSuccessMessage("Terrarium updated successfully.");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      alert("Failed to update terrarium. Please try again.");
    }
  };

  const handleDeleteConfirm = async (id) => {
    try {
      await deleteTerrarium(id);
      setTerrariums((prev) => prev.filter((t) => t.id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      alert("Failed to delete terrarium. Please try again.");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  const openEdit = (terrarium) => {
    setEditingTerrarium(terrarium);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingTerrarium(null);
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

        {successMessage && (
          <div className="admin-success">
            ✓ {successMessage}
          </div>
        )}

        {/* Edit Form */}
        {editingTerrarium && (
          <div className="admin-edit-section">
            <div className="admin-section-header">
              <h2>Editing — {editingTerrarium.name}</h2>
              <button className="admin-cancel-btn" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
            <TerrariumForm
              onSubmit={handleEdit}
              initialData={editingTerrarium}
              isEditing={true}
            />
          </div>
        )}

        {/* Add Section */}
        {!editingTerrarium && (
          <>
            <div className="admin-section-header">
              <h2>Terrarium Records</h2>
              <button
                className="admin-add-btn"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? "Cancel" : "+ Add Terrarium"}
              </button>
            </div>

            {showForm && (
              <TerrariumForm onSubmit={handleAdd} isEditing={false} />
            )}
          </>
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
                  <span>
                    {t.plants && t.plants.length > 0
                      ? `${t.plants.length} plant${t.plants.length > 1 ? "s" : ""}`
                      : "No plants listed"}
                  </span>
                  <span>
                    {t.commonProblems && t.commonProblems.length > 0
                      ? `${t.commonProblems.length} problem${t.commonProblems.length > 1 ? "s" : ""}`
                      : "No problems listed"}
                  </span>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirmId === t.id ? (
                  <div className="admin-delete-confirm">
                    <p>Are you sure you want to delete this record?</p>
                    <div className="admin-confirm-actions">
                      <button
                        className="admin-action-btn confirm-delete"
                        onClick={() => handleDeleteConfirm(t.id)}
                      >
                        Yes, Delete
                      </button>
                      <button
                        className="admin-action-btn cancel-delete"
                        onClick={() => setDeleteConfirmId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="admin-terrarium-actions">
                    <button
                      className="admin-action-btn edit"
                      onClick={() => openEdit(t)}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-action-btn delete"
                      onClick={() => setDeleteConfirmId(t.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default AdminDashboard;