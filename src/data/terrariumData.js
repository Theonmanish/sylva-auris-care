const terrariumDatabase = {

  "SA-TRM-2041": {
    name: "Fern Moss Bowl",
    overview:
      "A closed tropical terrarium featuring ferns and cushion moss. Ideal for beginners. The sealed environment creates a self-sustaining micro-ecosystem with minimal intervention required.",
    plants: ["Boston Fern", "Cushion Moss", "Creeping Fig"],
    light: "Indirect sunlight only. Place near a north or east-facing window. Direct sunlight will scorch the leaves and destabilize the moisture balance.",
    watering: "Mist lightly once every 10–14 days. The closed environment recycles moisture. If condensation is visible on the glass every morning, do not water.",
    humidity: "High humidity maintained naturally by the closed lid. Open the lid for 30 minutes once a week to allow air exchange and prevent mold buildup.",
    maintenance:
      "Trim any yellowing or overgrown leaves monthly using clean scissors. Remove dead plant matter immediately to prevent rot spreading to healthy plants.",
    commonProblems: [
      {
        problem: "Mold on soil surface",
        fix: "Open lid daily for 2–3 days. Reduce misting frequency.",
      },
      {
        problem: "Yellowing leaves",
        fix: "Move away from direct light. Check for overwatering.",
      },
      {
        problem: "Condensation too heavy",
        fix: "Leave lid slightly open for ventilation.",
      },
    ],
  },

  "SA-TRM-3102": {
    name: "Zen Pebble Dome",
    overview:
      "A semi-open desert-style terrarium featuring succulents and air plants. Designed for low-maintenance care. Thrives in bright light with infrequent watering.",
    plants: ["Echeveria", "Haworthia", "Tillandsia (Air Plant)"],
    light:
      "Bright indirect light for 6–8 hours daily. A south or west-facing window is ideal. Avoid full shade — succulents will stretch and weaken.",
    watering:
      "Water deeply once every 14–21 days. Allow soil to dry completely between waterings. Pour water at the base, never on the leaves.",
    humidity:
      "Low humidity preferred. Avoid placing near kitchens or bathrooms. Good airflow is essential — the open top assists natural ventilation.",
    maintenance:
      "Remove dead outer leaves by gently pulling downward. Rotate the terrarium quarterly for even light exposure. Wipe dust off leaves with a dry cloth monthly.",
    commonProblems: [
      {
        problem: "Soft, mushy leaves",
        fix: "Overwatering. Stop watering immediately and allow soil to dry for 3 weeks.",
      },
      {
        problem: "Stretching toward light",
        fix: "Move to a brighter location. Plant is not receiving enough light.",
      },
      {
        problem: "Brown leaf tips on air plant",
        fix: "Soak Tillandsia in water for 20 minutes once a week and allow to dry upside down.",
      },
    ],
  },
};

export default terrariumDatabase;