import terrariumDatabase from "../data/terrariumData";
import { getCurrentSeason } from "../utils/seasonUtils";
import { getClimateZone } from "../utils/climateUtils";

// Reads admin-created terrariums from localStorage
function getAdminTerrariums() {
  try {
    const stored = localStorage.getItem("sylva_terrariums");
    if (!stored) return {};

    const array = JSON.parse(stored);

    // Convert array to object keyed by ID
    // so lookup works the same way as terrariumData.js
    const result = {};
    array.forEach((t) => {
      if (t.status === "live") {
        result[t.id] = t;
      }
    });

    return result;
  } catch {
    return {};
  }
}

// Fetch terrarium by code — checks both sources
export const getTerrariumByCode = (code) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Source 1 — Admin-created records (localStorage)
      const adminRecords = getAdminTerrariums();

      if (adminRecords[code]) {
        resolve(adminRecords[code]);
        return;
      }

      // Source 2 — Hardcoded fallback records
      const hardcodedResult = terrariumDatabase[code];

      if (hardcodedResult) {
        resolve(hardcodedResult);
        return;
      }

      reject(new Error("Terrarium not found. Please check your code."));
    }, 800);
  });
};

// Stress level calculator
function calculateStressLevel(season, climate) {
  let score = 0;

  if (season === "Summer") score += 1;
  if (season === "Monsoon") score += 1;
  if (climate === "Semi-Arid") score += 1;
  if (climate === "Coastal Humid") score += 1;

  if (score >= 2) return "High";
  if (score === 1) return "Moderate";
  return "Low";
}

// Care guide generator with layered modifiers
export function generateCareGuide(baseData, city) {
  const season = getCurrentSeason();
  const climate = city ? getClimateZone(city) : null;

  let watering = baseData.watering;

  if (season === "Summer") {
    watering += " In summer, increase misting frequency slightly due to heat.";
  }
  if (season === "Monsoon") {
    watering +=
      " During monsoon, reduce watering — ambient humidity is naturally high.";
  }
  if (climate === "Coastal Humid") {
    watering +=
      " Coastal humidity is high — prioritise ventilation over watering.";
  }
  if (climate === "Semi-Arid") {
    watering += " Dry climate — monitor soil moisture more frequently.";
  }

  const stressLevel = calculateStressLevel(season, climate);

  return {
    ...baseData,
    season,
    climate,
    watering,
    stressLevel,
  };
}