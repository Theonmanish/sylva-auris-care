import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getTerrariumByCode, generateCareGuide } from "../api/terrariumApi";
import "./CareGuide.css";

function CareGuide() {
  const { code } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const city = params.get("city") || "";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setData(null);

    getTerrariumByCode(code)
      .then((result) => {
        const processed = generateCareGuide(result, city);
        setData(processed);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [code, city]);

  if (loading) {
  return (
    <div className="care-container">
      <div className="skeleton skeleton-title" />
      <div className="skeleton skeleton-badge" />
      <div className="skeleton skeleton-card" />
      <div className="skeleton skeleton-card" />
      <div className="skeleton skeleton-card" />
    </div>
  );
}
  if (error) {
    return (
      <div className="care-container">
        <p className="status-text error">{error}</p>
        <button className="care-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="care-container">

      {/* Header */}
      <div className="care-header">
        <h1>{data.name}</h1>
        <p className="care-code">Code: {code}</p>
      </div>

      {/* Environmental Status */}
      <div className={`stress-badge ${data.stressLevel}`}>
        Environmental Risk: {data.stressLevel}
      </div>

      {/* Context Info */}
      <div className="care-context">
        <span>Season: <strong>{data.season}</strong></span>
        {data.climate && (
          <span>Climate Zone: <strong>{data.climate}</strong></span>
        )}
      </div>

      {/* Section 1 — Overview */}
      <div className="care-section">
        <h3>Overview</h3>
        <p>{data.overview}</p>
      </div>

      {/* Section 2 — Plants */}
      <div className="care-section">
        <h3>Plants Inside This Terrarium</h3>
        <ul className="plant-list">
          {data.plants.map((plant, index) => (
            <li key={index}>{plant}</li>
          ))}
        </ul>
      </div>

      {/* Section 3 — Light */}
      <div className="care-section">
        <h3>Light Requirements</h3>
        <p>{data.light}</p>
      </div>

      {/* Section 4 — Watering */}
      <div className="care-section">
        <h3>Watering Instructions</h3>
        <p>{data.watering}</p>
      </div>

      {/* Section 5 — Humidity & Ventilation */}
      <div className="care-section">
        <h3>Humidity & Ventilation</h3>
        <p>{data.humidity}</p>
      </div>

      {/* Section 6 — Maintenance */}
      <div className="care-section">
        <h3>Maintenance & Trimming</h3>
        <p>{data.maintenance}</p>
      </div>

      {/* Section 7 — Seasonal Adjustments */}
      <div className="care-section">
        <h3>Seasonal Adjustments</h3>
        <p>
          Your terrarium is currently in <strong>{data.season}</strong> conditions.
          {data.climate && ` Your ${data.climate} climate zone has also been factored into these recommendations.`}
        </p>
      </div>

      {/* Section 8 — Common Problems */}
      <div className="care-section">
        <h3>Common Problems & Fixes</h3>
        {data.commonProblems && data.commonProblems.length > 0 ? (
          data.commonProblems.map((item, i) => (
            <div key={i} className="problem-item">
              <p className="problem-title">{item.problem}</p>
              <p className="problem-fix">{item.fix}</p>
            </div>
          ))
        ) : (
          <p style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>
            No common problems listed for this terrarium.
          </p>
        )}
      </div>

      <button className="care-btn" onClick={() => navigate("/")}>
        Back to Home
      </button>

    </div>
  );
}

export default CareGuide;
