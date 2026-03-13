import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const karnatakaCities = [
  "Bangalore", "Mysore", "Mangalore", "Udupi",
  "Hubli", "Dharwad", "Belagavi", "Ballari",
  "Kalaburagi", "Vijayapura", "Chikmagalur",
  "Madikeri", "Shivamogga",
];

function Home() {
  const [code, setCode] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault();

  const trimmedCode = code.trim().toUpperCase();
  const pattern = /^SA-TRM-\d{4}$/;

  if (!pattern.test(trimmedCode)) {
    setError("Invalid format. Please use SA-TRM-XXXX.");
    return;
  }

  setError(null);
  navigate(`/care/${trimmedCode}?city=${city}`);
};
  return (
    <main className="home">

      <div className="home-hero">
        <p className="home-eyebrow">Care Companion</p>
        <h1 className="home-title">Your Terrarium,<br />Understood.</h1>
        <p className="home-desc">
          Enter your unique terrarium code to receive a personalised,
          season-aware care guide built for your ecosystem.
        </p>
      </div>

      <div className="home-card">
        <form className="home-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="code">Terrarium Code</label>
            <input
              id="code"
              type="text"
              placeholder="SA-TRM-2041"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(null);
              }}
              
              spellCheck="false"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">
              City
              <span className="optional-badge">optional</span>
            </label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">Select for climate guidance</option>
              {karnatakaCities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="form-error">
              <span>⚠</span> {error}
            </div>
          )}

          <button
            type="submit"
            className="home-btn"
            disabled={!code.trim()}
          >
            View Care Guide
          </button>

        </form>

        <p className="home-hint">
          Your code is printed on the card included with your terrarium.
        </p>
      </div>

    </main>
  );
}

export default Home;