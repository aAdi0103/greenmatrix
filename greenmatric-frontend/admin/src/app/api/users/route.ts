import { NextResponse } from "next/server";
import { adminAuth, adminDb, requireAdmin } from "@/lib/firebaseAdmin";

function fail(e: unknown) {
  const m = e instanceof Error ? e.message : "error";
  const code = m === "unauthorized" ? 401 : m === "forbidden" ? 403 : 400;
  return NextResponse.json({ error: m }, { status: code });
}

export async function GET(req: Request) {
  try {
    await requireAdmin(req);
    const snap = await adminDb.collection("users").get();
    return NextResponse.json(snap.docs.map((d) => ({ uid: d.id, ...d.data() })));
  } catch (e) { return fail(e); }
}

export async function POST(req: Request) {
  try {
    await requireAdmin(req);
    const { name, email, password, role } = await req.json();
    if (!email || !password || !["admin", "rep"].includes(role)) throw new Error("invalid input");
    const u = await adminAuth.createUser({ email, password, displayName: name });
    await adminAuth.setCustomUserClaims(u.uid, { role });
    await adminDb.collection("users").doc(u.uid).set({
      name: name || email, email, role, active: true, createdAt: new Date(),
    });
    return NextResponse.json({ uid: u.uid });
  } catch (e) { return fail(e); }
}

export async function PATCH(req: Request) {
  try {
    await requireAdmin(req);
    const { uid, active, role } = await req.json();
    if (!uid) throw new Error("uid required");
    const patch: Record<string, unknown> = {};
    if (typeof active === "boolean") {
      patch.active = active;
      await adminAuth.updateUser(uid, { disabled: !active });
    }
    if (role && ["admin", "rep"].includes(role)) {
      patch.role = role;
      await adminAuth.setCustomUserClaims(uid, { role });
    }
    await adminDb.collection("users").doc(uid).set(patch, { merge: true });
    return NextResponse.json({ ok: true });
  } catch (e) { return fail(e); }
}
