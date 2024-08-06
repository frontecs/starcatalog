import { admin_supabase } from "@/utils/database/supabase";

const { data: aux_materie, error: aux_materie_error } = await admin_supabase
  .from("materii")
  .select("*");

var nume_materii = {};
for (const materie of aux_materie) {
  nume_materii[materie.id] = materie.nume;
}

export function getNumeMaterii() {
  return nume_materii;
}
