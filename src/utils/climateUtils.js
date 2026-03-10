export function getClimateZone(city) {
    
    if (!city) return null;

    const mapping = {
        bangalore: "Tropical Moderate",
       

        mysore: "Tropical Moderate",
       

        mangalore: "Coastal Humid",
       
        udupi: "Coastal Humid",
        karwar: "Coastal Humid",

        hubli: "Semi-Arid",
        dharwad: "Semi-Arid",
        belgaum: "Semi-Arid",
        belagavi: "Semi-Arid",
        ballari: "Semi-Arid",
        kalaburagi: "Semi-Arid",
        bijapur: "Semi-Arid",
        vijayapura: "Semi-Arid",

        chikmagalur: "Hill Cool",
        madikeri: "Hill Cool",
        kodagu: "Hill Cool",
        shimoga: "Moderate Rainforest",
        shivamogga: "Moderate Rainforest",
    };

    return mapping[city.toLowerCase().trim()] || null;

}