import { admin_supabase } from "@/utils/database/supabase";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  try {
    const { token } = req.headers;
    if (!isProfesor(token)) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const { data: clase, error: error2 } = await admin_supabase
      .from("clase")
      .select("*");

    res.status(200).json({ clase });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
