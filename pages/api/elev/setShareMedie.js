import { admin_supabase } from "@/utils/database/supabase";

export default async function handler(req, res) {
  const { token, set } = req.headers;

  if (set !== "true" && set !== "false") {
    return res.status(400).json({ error: "Invalid set value." });
  }

  if (!token) {
    return res.status(400).json({ error: "Missing token." });
  }

  const { data, error } = await admin_supabase.auth.getUser(token);
  if (error) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const { error: error_update } = await admin_supabase
    .from("user_data")
    .update({ distribuie_media: set })
    .eq("id", data.user.id);

  if (error_update) {
    console.log(error_update);
    return res.status(500).json({ error: "Something went wrong." });
  }

  res.status(200).json({ ok: true });
}
