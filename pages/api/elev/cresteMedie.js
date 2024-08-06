import { admin_supabase } from "@/utils/database/supabase";
import { getNumeMaterii } from "@/utils/elev/nume_materii";

function rotunjeste(numar) {
  if (numar % 1 >= 0.5) {
    return Math.ceil(numar);
  } else {
    return Math.floor(numar);
  }
}

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

  const { data: notes, error: noteError } = await admin_supabase
    .from("note")
    .select("materie, nota")
    .eq("elev", data.user.id)
    .order("created_at", { ascending: false });

  if (noteError) {
    console.log(noteError.message);
    return res.status(500).json({ error: "Something went wrong." });
  }

  if (!notes.length) {
    return res.status(404).json({ error: "Utilizatorul nu are note." });
  }

  const materieMap = new Map();

  notes.forEach(({ materie, nota }) => {
    if (!materieMap.has(materie)) {
      materieMap.set(materie, []);
    }
    materieMap.get(materie).push(nota);
  });

  const results = [];

  materieMap.forEach((notas, materie) => {
    const total = notas.reduce((acc, curr) => acc + curr, 0);
    const average = total / notas.length;

    let requiredTens = 0;
    let newAverage = average;

    while (
      rotunjeste(newAverage) <= rotunjeste(average + 1) - 0.5 &&
      rotunjeste(newAverage) < 10
    ) {
      requiredTens += 1;
      newAverage = (total + 10 * requiredTens) / (notas.length + requiredTens);
    }

    if (average >= 9.5) {
      return;
    }

    results.push({
      materie,
      average: newAverage,
      requiredTens,
    });
  });

  results.sort((a, b) => a.requiredTens - b.requiredTens);

  results.forEach((result) => {
    result.materie = nume_materii[result.materie];
  });

  res.status(200).json(results);
}
