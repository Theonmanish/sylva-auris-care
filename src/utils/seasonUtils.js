export function getCurrentSeason() {
  const month = new Date().getMonth() + 1; // 1–12

  if (month >= 3 && month <= 5) return "Summer";
  if (month >= 6 && month <= 9) return "Monsoon";
  if (month >= 10 && month <= 11) return "Post-Monsoon";
  return "Winter";
}