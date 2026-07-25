import { createClient } from "@supabase/supabase-js";

// Server-only service-role client (bypasses RLS). Used by the users API.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { autoRefreshToken: false, persistSession: false } },
);

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
