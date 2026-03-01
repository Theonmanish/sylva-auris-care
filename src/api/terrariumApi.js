import terrariumDatabase from "../data/terrariumData";

export const getTerrariumByCode = async (code) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

       
      const result = terrariumDatabase[code];

      if (result) {
        resolve(result);
      } else {
        reject(new Error("Terrarium not found"));
      }
    }, 1000);
  });
};