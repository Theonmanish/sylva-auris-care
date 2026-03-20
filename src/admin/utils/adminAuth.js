import supabase from "../../lib/supabaseClient";

// Sign in with email and password
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, message: error.message };
  return { success: true, session: data.session };
}

// Sign out
export async function logout() {
  await supabase.auth.signOut();
}

// Check if user is currently authenticated
export async function isAuthenticated() {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

// Get current session
export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}