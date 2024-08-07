import { admin_supabase } from "@/utils/database/supabase";
import { getNumeMaterii } from "@/utils/elev/nume_materii";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  let nume_materii = getNumeMaterii();
  const { token, elev, materie } = req.headers;

  if (!isProfesor(token)) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  console.log(materie);

  let id = Object.keys(nume_materii).find((key) => {
    if (
      nume_materii[key].normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
      materie
    ) {
      return true;
    }
  });

  const { data: note, error: noteError } = await admin_supabase
    .from("note")
    .select("*")
    .eq("elev", elev)
    .eq("materie", id);

  if (noteError) {
    console.log(noteError.message);
    return res.status(500).json({ error: "Something went wrong." });
  }

  let materii = {};
  for (const nota of note) {
    if (!materii[nota.materie]) {
      materii[1] = {
        nume: nume_materii[nota.materie],
        note: [nota],
      };
    } else {
      materii[nota.materie].note.push(nota);
    }
  }

  res.status(200).json({ materii });
}
