import { admin_supabase } from "@/utils/database/supabase";

const cache = {};

export default async function handler(req, res) {
  try {
    const { token } = req.headers;

    if (cache[token]) {
      console.log("Cache hit");
      return res.status(200).json(cache[token]);
    }

    const { data, error } = await admin_supabase.auth.getUser(token);
    if (error) {
      console.log(token, error.message);
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const { data: userData } = await admin_supabase
      .from("user_data")
      .select("*")
      .eq("id", data.user.id)
      .single();

    let name = `${userData.prenume} ${userData.nume}`;
    let response;

    if (userData.materie.length !== 0) {
      response = { nume: name, clasa: "Profesor" };
    } else {
      const { data: clasa } = await admin_supabase
        .from("clase")
        .select("*")
        .eq("id", userData.clasa)
        .single();

      response = { nume: name, clasa: clasa.nume };
    }

    cache[token] = response;

    return res.status(200).json(response);
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      return res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong." });
    }
  }
}
