import { getNumeMaterii } from "@/utils/elev/nume_materii";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  try {
    const { token } = req.headers;
    if (!isProfesor(token)) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    const nume_materii = getNumeMaterii();

    res.status(200).json({ materii: nume_materii });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
