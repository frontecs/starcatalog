import { admin_supabase } from "@/utils/database/supabase";
import { isProfesor } from "@/utils/profesor/validareProfesor";
export default async function handler(req, res) {
  try {
    const { token } = req.headers;
    if (!isProfesor(token)) {
      throw { type: "CredentialsSignin" };
    }

    res.status(200).json({ test: "true" });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
