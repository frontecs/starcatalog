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
    console.log(error.message);
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const { data: absente, error: noteError } = await admin_supabase
    .from("absente")
    .select("*")
    .eq("elev", data.user.id)
    .order("created_at", { ascending: false });

  if (noteError) {
    console.log(noteError.message);
    return res.status(500).json({ error: "Something went wrong." });
  }

  let sendAbsente = [];

  for (const absenta of absente) {
    sendAbsente.push([
      nume_materii[absenta.materie],
      absenta.created_at,
      absenta.motivata,
    ]);
  }

  res.status(200).json({ absente: sendAbsente });
}
