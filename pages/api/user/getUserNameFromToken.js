import { supabase } from "@/utils/database/supabase";

let users = [];
let clase = [];

export default async function handler(req, res) {
  try {
    const { token } = req.body;

    if (users[token] && clase[token]) {
      res.status(200).json({ nume: users[token], clasa: clase[token] });
      return;
    }

    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      console.log(token, error.message);
      res.status(401).json({ error: "Invalid credentials." });
    }

    const { data: userData } = await supabase
      .from("user_data")
      .select("*")
      .eq("id", data.user.id)
      .single();

    let name = `${userData.prenume} ${userData.nume}`;
    if (userData.materie.length != 0) {
      res.status(200).json({ nume: name, clasa: "Profesor" });
      return;
    }

    const { data: clasa } = await supabase
      .from("clase")
      .select("*")
      .eq("id", userData.clasa)
      .single();

    users[token] = name;
    clase[token] = clasa.nume;

    res.status(200).json({ nume: name, clasa: clasa.nume });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
