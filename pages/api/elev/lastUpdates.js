import { admin_supabase } from "@/utils/database/supabase";
import { getNumeMaterii } from "@/utils/elev/nume_materii";

export default async function handler(req, res) {
  let nume_materii = getNumeMaterii();
  const { token } = req.headers;

  if (!token) {
    return res.status(400).json({ error: "Missing token." });
  }

  const { data, error } = await admin_supabase.auth.getUser(token);
  if (error) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const { data: note_elev, error: note_error } = await admin_supabase
    .from("note")
    .select("*")
    .eq("elev", data.user.id)
    .order("created_at", { ascending: false })
    .limit(2);

  if (note_error) {
    return res.status(500).json({ error: "Something went wrong." });
  }

  let note = [];
  note_elev.forEach((entry) => {
    note.push({
      materie: nume_materii[entry.materie],
      data: entry.created_at,
      nota: entry.nota,
    });
  });

  const { data: absente_elev, error: absente_error } = await admin_supabase
    .from("absente")
    .select("*")
    .eq("elev", data.user.id)
    .order("created_at", { ascending: false })
    .limit(2);

  if (absente_error) {
    return res.status(500).json({ error: "Something went wrong." });
  }

  let absente = [];
  absente_elev.forEach((entry) => {
    absente.push({
      materie: nume_materii[entry.materie],
      data: entry.created_at,
      motivata: entry.motivata,
    });
  });

  res.status(200).json({ note, absente });
}
