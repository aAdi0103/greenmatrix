import { createClient } from "@supabase/supabase-js";

// Browser client (anon key) — used for auth + RLS-guarded data reads/writes in the admin app.
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
