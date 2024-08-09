import { admin_supabase } from "../database/supabase";

export async function isProfesor(user_token) {
  if (!user_token) {
    return false;
  }

  const { data: authData, error: authError } =
    await admin_supabase.auth.getUser(user_token);

  if (authError) return false;

  const { data: userData } = await admin_supabase
    .from("user_data")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  if (userData.materie.length == 0) {
    return [false, userData];
  }

  return [true, userData];
}
