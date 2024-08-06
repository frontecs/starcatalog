import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://bcxbjvdszrltcyuiqroa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjeGJqdmRzenJsdGN5dWlxcm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTYyOTY1NzMsImV4cCI6MjAzMTg3MjU3M30.DA_CCKqXL0LM1k3aC2FWmxSd_wAOUn_ODN0k_kpk1qc"
);

export const admin_supabase = createClient(
  "https://bcxbjvdszrltcyuiqroa.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjeGJqdmRzenJsdGN5dWlxcm9hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNjI5NjU3MywiZXhwIjoyMDMxODcyNTczfQ.cn7jj2cSQEVotcio5QuDx3Pp4vm83h2suSgT9i8qKqc"
);
