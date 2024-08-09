import { admin_supabase } from "@/utils/database/supabase";
import { getNumeMaterii } from "@/utils/elev/nume_materii";
import { isProfesor } from "@/utils/profesor/validareProfesor";

export default async function handler(req, res) {
  try {
    const nume_materii = getNumeMaterii();
    let { token, idelev, materie, nota, datanota, dataabsenta } = req.headers;

    let type;
    if (nota) type = "nota";
    else type = "absenta";

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

    let allowed = false;

    if (userData.materie.includes(Number(id))) allowed = true;
    else return res.status(401).json({ ok: false, error: "No permission" });

    if (type === "nota") {
      if (nota < 1 || nota > 10)
        return res.status(400).json({ error: "Invalid nota" });
      let { error: addError } = await admin_supabase.from("note").insert([
        {
          elev: idelev,
          materie: id,
          created_at: datanota,
          nota,
        },
      ]);
      if (addError) {
        console.log(addError, idelev);
        return res.status(500).json({ error: "Something went wrong." });
      }
      return res.status(200).json({ ok: true });
    } else if (type === "absenta") {
      let { error: addError } = await admin_supabase.from("absente").insert([
        {
          elev: idelev,
          materie: id,
          created_at: dataabsenta,
        },
      ]);
      if (addError) {
        console.log(addError);
        return res.status(500).json({ error: "Something went wrong." });
      }
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: "Invalid type" });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
