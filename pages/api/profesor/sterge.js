import { admin_supabase } from "@/utils/database/supabase";
import { getNumeMaterii } from "@/utils/elev/nume_materii";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  try {
    const nume_materii = getNumeMaterii();
    let { token, materie, idabsenta, motiveaza, idnota } = req.headers;

    const [profesor, userData] = await isProfesor(token);
    if (!profesor) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    let type;
    if (idabsenta) type = "absente";
    else if (idnota) type = "note";
    else return res.status(400).json({ error: "Invalid request." });

    let allowed = false;
    let id = Object.keys(nume_materii).find((key) => {
      if (
        nume_materii[key].normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
        materie
      ) {
        return true;
      }
    });
    if (userData.materie.includes(Number(id))) allowed = true;
    else return res.status(401).json({ ok: false, error: "No permission" });

    if (type === "absente") {
      if (motiveaza === "true") {
        console.log("Motiveaza absenta");
        if (!idabsenta)
          return res.status(400).json({ error: "Invalid request." });
        const { error } = await admin_supabase
          .from("absente")
          .update({ motivata: true })
          .eq("id", idabsenta);

        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Something went wrong." });
        }
      } else {
        if (!idabsenta)
          return res.status(400).json({ error: "Invalid request." });
        const { error } = await admin_supabase
          .from("absente")
          .delete()
          .eq("id", idabsenta);

        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Something went wrong." });
        }

        console.log("Sterge absenta");
      }
    } else {
      console.log("Sterge nota");

      if (!idnota) return res.status(400).json({ error: "Invalid request." });
      const { error } = await admin_supabase
        .from("note")
        .delete()
        .eq("id", idnota);

      if (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong." });
      }
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
