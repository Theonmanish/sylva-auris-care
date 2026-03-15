import terrariumDatabase from "../data/terrariumData";
import { getCurrentSeason } from "../utils/seasonUtils";
import { getClimateZone } from "../utils/climateUtils";
import { fetchTerrariumById } from "./supabaseApi";

// Fetch terrarium by code
// Checks Supabase first, then falls back to hardcoded data
export const getTerrariumByCode = (code) => {
  return new Promise((resolve, reject) => {
    fetchTerrariumById(code)
      .then((supabaseResult) => {
        if (supabaseResult) {
          // Normalize snake_case DB fields to camelCase
          const normalized = {
            ...supabaseResult,
            commonProblems: supabaseResult.common_problems || [],
          };
          resolve(normalized);
          return;
        }

        // Fallback to hardcoded data
        const hardcodedResult = terrariumDatabase[code];
        if (hardcodedResult) {
          resolve(hardcodedResult);
          return;
        }

        reject(new Error("Terrarium not found. Please check your code."));
      })
      .catch(() => {
        // If Supabase fails, try hardcoded fallback
        const hardcodedResult = terrariumDatabase[code];
        if (hardcodedResult) {
          resolve(hardcodedResult);
          return;
        }
        reject(new Error("Terrarium not found. Please check your code."));
      });
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