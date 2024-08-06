import { supabase } from "@/utils/database/supabase";

export default async function handler(req, res) {
  try {
    let { email, password } = req.body;
    email = email.trim();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (data.user != null) {
      console.log(data.user.id);
      const { data: userData, error: userError } = await supabase
        .from("user_data")
        .select("*")
        .eq("id", data.user.id)
        .single();

      res.status(200).json({ data, userData });
    } else {
      throw new Error("CredentialsSignin");
    }
  } catch (error) {
    if (error.type === "CredentialsSignin") {
      res.status(401).json({ error: "Invalid credentials." });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
