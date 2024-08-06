import { admin_supabase } from "@/utils/database/supabase";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  const { token, id } = req.headers;

  if (!token) {
    return res.status(400).json({ error: "Missing token." });
  }

  if (!isProfesor(token)) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  const userId = id;

  const { data: notes, error: notesError } = await admin_supabase
    .from("note")
    .select("created_at, nota")
    .eq("elev", userId);

  if (notesError) {
    return res.status(500).json({ error: "Error fetching notes." });
  }

  if (!notes.length) {
    return res.status(404).json({ error: "No notes found for this user." });
  }

  notes.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

  let runningSum = 0;
  let runningCount = 0;
  const averages = [];

  notes.forEach(({ created_at, nota }) => {
    runningSum += nota;
    runningCount += 1;
    const average = runningSum / runningCount;
    averages.push({ created_at, average });
  });

  res.status(200).json(averages);
}
