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

  const { data: note, error: noteError } = await admin_supabase
    .from("note")
    .select("*")
    .eq("elev", data.user.id);

  if (noteError) {
    console.log(noteError.message);
    return res.status(500).json({ error: "Something went wrong." });
  }
  let materii = {};
  for (const nota of note) {
    if (!materii[nota.materie]) {
      materii[nota.materie] = {
        nume: nume_materii[nota.materie],
        note: [nota],
      };
    } else {
      materii[nota.materie].note.push(nota);
    }
  }

  res.status(200).json({ materii });
}
