import supabase from "../lib/supabaseClient";

// Fetch a single terrarium by ID — public access
// Only returns live terrariums due to RLS policy
export async function fetchTerrariumById(id) {
  const { data, error } = await supabase
    .from("terrariums")
    .select("*")
    .eq("id", id)
    .eq("status", "live")
    .single();

  if (error) return null;
  return data;
}

// Fetch all terrariums — admin use only
export async function fetchAllTerrariums() {
  const { data, error } = await supabase
    .from("terrariums")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data;
}

// Create a new terrarium
export async function createTerrarium(terrarium) {
  const { data, error } = await supabase
    .from("terrariums")
    .insert([formatForDB(terrarium)])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Update an existing terrarium
export async function updateTerrarium(terrarium) {
  const { data, error } = await supabase
    .from("terrariums")
    .update(formatForDB(terrarium))
    .eq("id", terrarium.id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Delete a terrarium
export async function deleteTerrarium(id) {
  const { error } = await supabase
    .from("terrariums")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
  return true;
}

// Format terrarium object for database
// Converts camelCase to snake_case for DB columns
function formatForDB(terrarium) {
  return {
    id: terrarium.id,
    name: terrarium.name,
    shape: terrarium.shape,
    type: terrarium.type,
    ecosystem: terrarium.ecosystem,
    status: terrarium.status,
    plants: terrarium.plants,
    overview: terrarium.overview,
    light: terrarium.light,
    watering: terrarium.watering,
    humidity: terrarium.humidity,
    maintenance: terrarium.maintenance,
    common_problems: terrarium.commonProblems || [],
    updated_at: new Date().toISOString(),
  };
}
