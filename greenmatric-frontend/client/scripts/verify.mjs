// End-to-end live verification against the real Supabase project + running dev servers.
// Run: ./test.sh  (or: cd client && node ../tests/verify.mjs with SUPABASE env exported)
import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const CLIENT = process.env.CLIENT_URL || "http://localhost:3000";
const ADMIN = process.env.ADMIN_URL || "http://localhost:3001";

const mk = () => createClient(URL, ANON, { auth: { persistSession: false } });
let pass = 0, fail = 0;
// eslint-disable-next-line @typescript-eslint/no-unused-expressions
const ok = (c, m) => { c ? (pass++, console.log("✅", m)) : (fail++, console.log("❌", m)); };

async function main() {
  const anon = mk();

  // --- RLS: anonymous ---
  const leadsAnon = await anon.from("leads").select("id");
  ok((leadsAnon.data ?? []).length === 0, "anon sees 0 leads (RLS hides them)");
  const insAnon = await anon.from("leads").insert({ name: "x", phone: "+911234567890", status: "new" });
  ok(!!insAnon.error, "anon cannot insert a lead (RLS)");
  const pub = await anon.from("articles").select("slug").eq("status", "published");
  ok((pub.data ?? []).length >= 1, "anon reads published articles");
  const draft = await anon.from("articles").select("slug").eq("slug", "choosing-a-labeling-machine");
  ok((draft.data ?? []).length === 0, "anon cannot see a draft article (RLS)");

  // --- Admin auth + full access ---
  const admin = mk();
  const aLogin = await admin.auth.signInWithPassword({ email: "admin@greenmatrix.test", password: "password123" });
  ok(!aLogin.error, "admin logs in");
  const adminToken = aLogin.data.session?.access_token;
  const aLeads = await admin.from("leads").select("id").limit(100);
  ok((aLeads.data ?? []).length === 6, "admin reads all 6 leads");
  const oneLead = aLeads.data[0].id;
  ok(!(await admin.from("leads").update({ feedback: "verify" }).eq("id", oneLead)).error, "admin updates a lead");
  ok(!(await admin.from("lead_notes").insert({ lead_id: oneLead, text: "note", author_uid: "t", author_name: "Admin" })).error, "admin adds a note");
  const art = await admin.from("articles").insert({ slug: `verify-${Date.now()}`, title: "V", status: "published", body: "<p>x</p>", published_at: new Date().toISOString() }).select("id").single();
  ok(!art.error, "admin creates + publishes an article");
  const profiles = await admin.from("profiles").select("id");
  ok((profiles.data ?? []).length >= 2, "admin reads profiles");

  // --- Rep auth + limited access ---
  const rep = mk();
  const rLogin = await rep.auth.signInWithPassword({ email: "rep@greenmatrix.test", password: "password123" });
  ok(!rLogin.error, "rep logs in");
  const repToken = rLogin.data.session?.access_token;
  ok(((await rep.from("leads").select("id")).data ?? []).length === 6, "rep reads leads (sees all)");
  ok(!!(await rep.from("articles").insert({ slug: `rep-${Date.now()}`, title: "R", status: "draft" })).error, "rep cannot write articles (RLS)");

  // --- createLead route ---
  const good = await fetch(`${CLIENT}/api/lead`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Route Test", phone: "+919999999999", sourcePage: "/verify" }) });
  ok(good.ok, "POST /api/lead creates a lead");
  const bad = await fetch(`${CLIENT}/api/lead`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "x", phone: "123" }) });
  ok(bad.status === 400, "POST /api/lead rejects invalid phone (400)");

  // --- users API (admin app) ---
  const noTok = await fetch(`${ADMIN}/api/users`);
  ok(noTok.status === 401, "GET /api/users without token → 401");
  const asRep = await fetch(`${ADMIN}/api/users`, { headers: { Authorization: `Bearer ${repToken}` } });
  ok(asRep.status === 403, "GET /api/users as rep → 403");
  const asAdmin = await fetch(`${ADMIN}/api/users`, { headers: { Authorization: `Bearer ${adminToken}` } });
  const users = await asAdmin.json();
  ok(asAdmin.ok && Array.isArray(users) && users.length >= 2, "GET /api/users as admin → user list");

  // cleanup the verify article
  if (art.data?.id) await admin.from("articles").delete().eq("id", art.data.id);

  console.log(`\n${fail === 0 ? "✅ ALL" : "❌ SOME"} — ${pass} passed, ${fail} failed`);
  process.exit(fail === 0 ? 0 : 1);
}
main().catch((e) => { console.error(e); process.exit(1); });
