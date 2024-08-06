import { createClient } from "@supabase/supabase-js";

export const admin_supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE
);
