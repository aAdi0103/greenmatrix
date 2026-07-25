import { NextResponse } from "next/server";
import { supabaseAdmin, requireAdmin } from "@/lib/supabaseAdmin";

function fail(e: unknown) {
  const m = e instanceof Error ? e.message : "error";
  const code = m === "unauthorized" ? 401 : m === "forbidden" ? 403 : 400;
  return NextResponse.json({ error: m }, { status: code });
}

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const { data, error } = await supabaseAdmin.from("profiles").select("*").order("created_at");
    if (error) throw error;
    return NextResponse.json(data.map((r) => ({ uid: r.id, name: r.name, email: r.email, role: r.role, active: r.active })));
  } catch (e) { return fail(e); }
}

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const { name, email, password, role } = await req.json();
    if (!email || !password || !["admin", "rep"].includes(role)) throw new Error("invalid input");
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email, password, email_confirm: true,
      app_metadata: { role }, user_metadata: { name },
    });
    if (error) throw error;
    const uid = data.user.id;
    await supabaseAdmin.from("profiles").upsert({ id: uid, name: name || email, email, role, active: true });
    return NextResponse.json({ uid });
  } catch (e) { return fail(e); }
}

export async function PATCH(req: Request) {
  try {
    await requireAdmin(req);
    const { uid, active, role } = await req.json();
    if (!uid) throw new Error("uid required");
    const profilePatch: Record<string, unknown> = {};
    if (role && ["admin", "rep"].includes(role)) {
      await supabaseAdmin.auth.admin.updateUserById(uid, { app_metadata: { role } });
      profilePatch.role = role;
    }
    if (typeof active === "boolean") {
      await supabaseAdmin.auth.admin.updateUserById(uid, { ban_duration: active ? "none" : "876000h" });
      profilePatch.active = active;
    }
    if (Object.keys(profilePatch).length) await supabaseAdmin.from("profiles").update(profilePatch).eq("id", uid);
    return NextResponse.json({ ok: true });
  } catch (e) { return fail(e); }
}
