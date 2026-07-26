import "server-only";
import { createClient } from "@supabase/supabase-js";

// ⚠️ TEMPORARY hardcoded fallbacks for testing deploys without env vars.
// REMOVE before production and ROTATE the service_role key (it must never live in git).
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://docamkzrimloflgpxpnw.supabase.co";
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvY2Fta3pyaW1sb2ZsZ3B4cG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NjM1ODcsImV4cCI6MjEwMDUzOTU4N30.K27u2PaeWfD_hHWYeIuR06vQ4_6J5b6hEUc2HbyB1BQ";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvY2Fta3pyaW1sb2ZsZ3B4cG53Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk2MzU4NywiZXhwIjoyMTAwNTM5NTg3fQ.JJ61xQVR4Q3eO0LcowtY963yk7wQst_UlxbWKE3gXyM";

// Anon client for SSR reads (RLS allows public read of published articles).
export const supabaseAnon = createClient(URL, ANON, { auth: { persistSession: false } });

// Service-role client for the lead write path (no anon insert policy on leads).
export const supabaseService = createClient(URL, SERVICE, {
  auth: { autoRefreshToken: false, persistSession: false },
});
