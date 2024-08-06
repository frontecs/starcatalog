import { admin_supabase } from "@/utils/database/supabase";

export default async function handler(req, res) {
  const { token } = req.headers;

  if (!token) {
    return res.status(400).json({ error: "Missing token." });
  }

  const { data, error } = await admin_supabase.auth.getUser(token);
  if (error) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const { data: elev, error: elevError } = await admin_supabase
    .from("user_data")
    .select("distribuie_media")
    .eq("id", data.user.id);

  if (elevError) {
    return res.status(500).json({ error: "Something went wrong." });
  }

  res.status(200).json({ enabled: elev[0].distribuie_media });
}
