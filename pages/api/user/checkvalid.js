import { admin_supabase } from "@/utils/database/supabase";

export default async function handler(req, res) {
  try {
    const { token } = req.headers;
    const { error } = await admin_supabase.auth.getUser(token);
    if (error) {
      res.status(401).json({ error: "Invalid credentials." });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      console.log(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
