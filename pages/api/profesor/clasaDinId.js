import { admin_supabase } from "@/utils/database/supabase";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  try {
    const { token, id } = req.headers;
    if (!isProfesor(token)) {
      throw { type: "CredentialsSignin" };
    }

    const { data: clase, error: error2 } = await admin_supabase
      .from("clase")
      .select("*")
      .eq("id", id)
      .single();

    let { data: elevi, error: error3 } = await admin_supabase
      .from("user_data")
      .select("*")
      .eq("clasa", id);

    for (let i = 0; i < elevi.length; i++) {
      const medie = await getmedie(elevi[i].id);
      if (medie) {
        elevi[i].medie = medie[medie.length - 1].average;
      }
    }

    res.status(200).json({ clase, elevi });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}

async function getmedie(id) {
  try {
    const userId = id;

    const { data: notes, error: notesError } = await admin_supabase
      .from("note")
      .select("created_at, nota")
      .eq("elev", userId);

    if (notesError) {
      return false;
    }

    if (!notes.length) {
      return false;
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

    return averages;
  } catch (error) {
    console.log(error);
    return [];
  }
}
