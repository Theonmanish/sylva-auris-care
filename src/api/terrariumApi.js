import terrariumDatabase from "../data/terrariumData";
import { getCurrentSeason } from "../utils/seasonUtils";
import { getClimateZone } from "../utils/climateUtils";

// Fetch terrarium by code (simulated API call)
export const getTerrariumByCode = (code) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const result = terrariumDatabase[code];

      if (result) {
        resolve(result);
      } else {
        reject(new Error("Terrarium not found. Please check your code."));
      }
    }, 1000);
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

  // Seasonal modifier
  if (season === "Summer") {
    watering += " In summer, increase misting frequency slightly due to heat.";
  }
  if (season === "Monsoon") {
    watering +=
      " During monsoon, reduce watering — ambient humidity is naturally high.";
  }

  // Climate modifier
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