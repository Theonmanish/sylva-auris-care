import { useState } from "react";
import "./TerrariumForm.css";

const ecosystemOptions = ["Tropical", "Moss", "Desert", "Mixed"];
const typeOptions = ["Closed", "Open", "Semi-closed"];
const shapeOptions = ["Jar", "Bowl", "Cube", "Hanging", "Custom"];

function TerrariumForm({ onSubmit }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    shape: "",
    type: "",
    ecosystem: "",
    plants: "",
    overview: "",
    light: "",
    watering: "",
    humidity: "",
    maintenance: "",
    status: "draft",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const required = ["id", "name", "type", "ecosystem", "overview",
                      "light", "watering", "humidity", "maintenance"];
    const newErrors = {};

    required.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = "This field is required.";
      }
    });

    const idPattern = /^SA-TRM-\d{4}$/;
    if (form.id && !idPattern.test(form.id.trim())) {
      newErrors.id = "Format must be SA-TRM-XXXX";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTerrarium = {
      ...form,
      id: form.id.trim().toUpperCase(),
      plants: form.plants
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      commonProblems: [],
    };

    onSubmit(newTerrarium);
  };

  return (
    <form className="terrarium-form" onSubmit={handleSubmit}>
      <div className="form-section-title">New Terrarium Record</div>

      <div className="tf-grid">

        {/* ID */}
        <div className="tf-group">
          <label>Terrarium ID</label>
          <input
            name="id"
            placeholder="SA-TRM-XXXX"
            value={form.id}
            onChange={handleChange}
          />
          {errors.id && <span className="tf-error">{errors.id}</span>}
        </div>

        {/* Name */}
        <div className="tf-group">
          <label>Terrarium Name</label>
          <input
            name="name"
            placeholder="e.g. Fern Moss Bowl"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span className="tf-error">{errors.name}</span>}
        </div>

        {/* Shape */}
        <div className="tf-group">
          <label>Shape</label>
          <select name="shape" value={form.shape} onChange={handleChange}>
            <option value="">Select shape</option>
            {shapeOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div className="tf-group">
          <label>Type</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="">Select type</option>
            {typeOptions.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.type && <span className="tf-error">{errors.type}</span>}
        </div>

        {/* Ecosystem */}
        <div className="tf-group">
          <label>Ecosystem</label>
          <select
            name="ecosystem"
            value={form.ecosystem}
            onChange={handleChange}
          >
            <option value="">Select ecosystem</option>
            {ecosystemOptions.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          {errors.ecosystem && (
            <span className="tf-error">{errors.ecosystem}</span>
          )}
        </div>

        {/* Status */}
        <div className="tf-group">
          <label>Publishing Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="draft">Draft</option>
            <option value="live">Live</option>
          </select>
        </div>

      </div>

      {/* Plants */}
      <div className="tf-group tf-full">
        <label>Plants (comma separated)</label>
        <input
          name="plants"
          placeholder="Boston Fern, Cushion Moss, Creeping Fig"
          value={form.plants}
          onChange={handleChange}
        />
      </div>

      {/* Overview */}
      <div className="tf-group tf-full">
        <label>Overview</label>
        <textarea
          name="overview"
          rows={3}
          placeholder="Brief description of this terrarium..."
          value={form.overview}
          onChange={handleChange}
        />
        {errors.overview && (
          <span className="tf-error">{errors.overview}</span>
        )}
      </div>

      {/* Light */}
      <div className="tf-group tf-full">
        <label>Light Requirements</label>
        <textarea
          name="light"
          rows={2}
          placeholder="Describe light needs..."
          value={form.light}
          onChange={handleChange}
        />
        {errors.light && <span className="tf-error">{errors.light}</span>}
      </div>

      {/* Watering */}
      <div className="tf-group tf-full">
        <label>Watering Instructions</label>
        <textarea
          name="watering"
          rows={2}
          placeholder="Describe watering schedule..."
          value={form.watering}
          onChange={handleChange}
        />
        {errors.watering && (
          <span className="tf-error">{errors.watering}</span>
        )}
      </div>

      {/* Humidity */}
      <div className="tf-group tf-full">
        <label>Humidity & Ventilation</label>
        <textarea
          name="humidity"
          rows={2}
          placeholder="Describe humidity and ventilation needs..."
          value={form.humidity}
          onChange={handleChange}
        />
        {errors.humidity && (
          <span className="tf-error">{errors.humidity}</span>
        )}
      </div>

      {/* Maintenance */}
      <div className="tf-group tf-full">
        <label>Maintenance & Trimming</label>
        <textarea
          name="maintenance"
          rows={2}
          placeholder="Describe maintenance routine..."
          value={form.maintenance}
          onChange={handleChange}
        />
        {errors.maintenance && (
          <span className="tf-error">{errors.maintenance}</span>
        )}
      </div>

      <button type="submit" className="tf-submit">
        Save Terrarium Record
      </button>

    </form>
  );
}

export default TerrariumForm;
