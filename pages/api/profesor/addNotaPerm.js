import { getNumeMaterii } from "@/utils/elev/nume_materii";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  try {
    const nume_materii = getNumeMaterii();
    let { token, materie } = req.headers;
    const [profesor, userData] = await isProfesor(token);
    if (!profesor) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    let id = Object.keys(nume_materii).find((key) => {
      if (
        nume_materii[key].normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
        materie
      ) {
        return true;
      }
    });

    if (userData.materie.includes(Number(id)))
      return res.status(200).json({ ok: true });
    else return res.status(401).json({ ok: false, error: "No permission" });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
