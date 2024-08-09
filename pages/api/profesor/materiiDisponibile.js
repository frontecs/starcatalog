import { getNumeMaterii } from "@/utils/elev/nume_materii";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  const nume_materii = getNumeMaterii();

  const { token } = req.headers;
  const [profesor] = await isProfesor(token);

  if (!profesor) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  res.status(200).json({ materii: nume_materii });
}
