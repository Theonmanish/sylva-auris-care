import supabase from "../../lib/supabaseClient";

export async function generateTerrariumContent(input) {
  const { plants, type, shape, ecosystem } = input;

  try {
    const { data, error } = await supabase.functions.invoke("groq-autofill", {
      body: { plants, type, shape, ecosystem },
    });

    if (error) {
      if (error.message?.includes("429")) {
        throw new Error("Rate limit reached. Please wait 60 seconds and try again.");
      }
      throw new Error(error.message || "Autofill failed.");
    }

    return data;

  } catch (err) {
    console.error("Autofill error:", err);
    throw err;
  }
}