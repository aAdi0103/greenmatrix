import { createClient } from "@supabase/supabase-js";

// ⚠️ TEMPORARY hardcoded fallbacks for testing deploys without env vars.
// REMOVE before production and ROTATE the service_role key (it must never live in git).
const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://docamkzrimloflgpxpnw.supabase.co";
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvY2Fta3pyaW1sb2ZsZ3B4cG53Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk2MzU4NywiZXhwIjoyMTAwNTM5NTg3fQ.JJ61xQVR4Q3eO0LcowtY963yk7wQst_UlxbWKE3gXyM";

// Server-only service-role client (bypasses RLS). Used by the users API.
export const supabaseAdmin = createClient(URL, SERVICE, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Verify the caller's access token and require the admin role. Throws on failure.
export async function requireAdmin(req: Request): Promise<string> {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) throw new Error("unauthorized");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) throw new Error("unauthorized");
  if (data.user.app_metadata?.role !== "admin") throw new Error("forbidden");
  return data.user.id;
}
