import { createClient } from "@supabase/supabase-js";

// ⚠️ TEMPORARY hardcoded fallbacks for testing deploys without env vars. Remove before production.
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://docamkzrimloflgpxpnw.supabase.co";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvY2Fta3pyaW1sb2ZsZ3B4cG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NjM1ODcsImV4cCI6MjEwMDUzOTU4N30.K27u2PaeWfD_hHWYeIuR06vQ4_6J5b6hEUc2HbyB1BQ";

// Browser client (anon key) — auth + RLS-guarded data in the admin app.
export const supabase = createClient(URL, ANON);
