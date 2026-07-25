// Seed / initialise the Supabase project: users, sample leads, articles, product images.
// Run: ./seed.sh  (sources admin/.env.local for NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY)
import { createClient } from "@supabase/supabase-js";
import { readdirSync, readFileSync } from "node:fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) { console.error("Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY"); process.exit(1); }
const supa = createClient(url, key, { auth: { persistSession: false } });

const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * 864e5).toISOString();

async function ensureUser(email, role, name) {
  const { data: created, error } = await supa.auth.admin.createUser({
    email, password: "password123", email_confirm: true,
    app_metadata: { role }, user_metadata: { name },
  });
  let uid;
  if (error) {
    const { data: list } = await supa.auth.admin.listUsers({ page: 1, perPage: 1000 });
    const u = list.users.find((x) => x.email === email);
    if (!u) throw error;
    uid = u.id;
    await supa.auth.admin.updateUserById(uid, { app_metadata: { role }, password: "password123" });
  } else uid = created.user.id;
  await supa.from("profiles").upsert({ id: uid, name, email, role, active: true });
  return uid;
}

async function uploadProductImages() {
  const dir = new URL("../../seed/assets/products/", import.meta.url);
  let files = [];
  try { files = readdirSync(dir).filter((f) => f.endsWith(".jpg")); } catch { return 0; }
  for (const f of files) {
    const slug = f.replace(/\.jpg$/, "");
    const buf = readFileSync(new URL(f, dir));
    const { error } = await supa.storage.from("products").upload(`${slug}/main.jpg`, buf, {
      contentType: "image/jpeg", upsert: true,
    });
    if (error) throw error;
  }
  return files.length;
}

async function main() {
  await ensureUser("admin@greenmatrix.test", "admin", "Admin User");
  await ensureUser("rep@greenmatrix.test", "rep", "Sales Rep");

  await supa.from("leads").delete().gte("created_at", "1900-01-01"); // notes cascade
  await supa.from("articles").delete().gte("created_at", "1900-01-01");

  await supa.from("leads").insert([
    { name: "Rajesh Kumar", phone: "+919812345671", city: "Ranchi", state: "Jharkhand", product_interest: "Automatic Water RFC (Rinser–Filler–Capper)", capacity: "120 BPM", status: "new", source: "web_form", source_page: "/products/water-rfc", message: "Starting a 1000 sqft water plant.", created_at: daysAgo(0), updated_at: daysAgo(0) },
    { name: "Sunita Devi", phone: "+919812345672", city: "Bokaro", state: "Jharkhand", product_interest: "Mineral Water Plant (turnkey line)", capacity: "2000 LPH", status: "contacted", source: "whatsapp", source_page: "/solutions/water-plant", contacted: true, contacted_at: daysAgo(2), assigned_to: "Sales Rep", follow_up_date: today, created_at: daysAgo(3), updated_at: daysAgo(2) },
    { name: "Mohammed Irfan", phone: "+919812345673", city: "Patna", state: "Bihar", product_interest: "Automatic Rotary BOPP Labeler", capacity: "18000 BPH", status: "quoted", source: "web_form", source_page: "/products/rotary-bopp-labeler", contacted: true, deal_value: 850000, created_at: daysAgo(8), updated_at: daysAgo(6) },
    { name: "Anil Sharma", phone: "+919812345674", city: "Kolkata", state: "West Bengal", product_interest: "20L Jar Line (turnkey line)", capacity: "600 JPH", status: "negotiation", source: "call_back", source_page: "/solutions/jar-line", contacted: true, deal_value: 1200000, created_at: daysAgo(14), updated_at: daysAgo(4) },
    { name: "Priya Singh", phone: "+919812345675", city: "Dhanbad", state: "Jharkhand", product_interest: "Automatic Shrink Wrapping Machine", capacity: "12 PPM", status: "won", source: "web_form", source_page: "/products/shrink-wrapping", contacted: true, deal_value: 450000, won_lost_reason: "Best price + fast delivery", closed_by: "rep@greenmatrix.test", created_at: daysAgo(20), updated_at: new Date().toISOString() },
    { name: "Vikram Rao", phone: "+919812345676", city: "Bhubaneswar", state: "Odisha", product_interest: "Water Purification System", capacity: "5000 LPH", status: "lost", source: "web_form", source_page: "/products/water-purification", contacted: true, won_lost_reason: "Went with local vendor", created_at: daysAgo(25), updated_at: daysAgo(22) },
  ]);

  await supa.from("articles").insert([
    {
      title: "How to start a mineral water plant in India",
      slug: "how-to-start-a-water-plant",
      excerpt: "Licences, BIS/ISI, capacity and budget — a practical starter guide for entrepreneurs.",
      body: "<h2>Overview</h2><p>Starting a packaged drinking water plant needs the right licences, a compliant treatment line and the correct machine capacity for your market.</p><h2>Licences you need</h2><ul><li>BIS / ISI certification</li><li>FSSAI licence</li><li>Local pollution and water board approvals</li></ul><h2>Budget & capacity</h2><p>A small line starts around 1000–2000 LPH. Talk to us for a turnkey quote.</p>",
      tags: ["guide", "water plant", "licence"],
      seo_title: "How to Start a Mineral Water Plant in India — Costs & Licences",
      seo_meta: "Step-by-step guide to starting a packaged water plant: BIS/ISI, FSSAI, capacity and budget.",
      status: "published", author_uid: "seed", published_at: daysAgo(2), created_at: daysAgo(4), updated_at: daysAgo(2),
    },
    {
      title: "Choosing the right labeling machine (draft)",
      slug: "choosing-a-labeling-machine",
      excerpt: "BOPP vs shrink sleeve vs sticker — which fits your bottle and budget.",
      body: "<p>Draft — comparison coming soon.</p>",
      tags: ["labeling"], status: "draft", author_uid: "seed", created_at: daysAgo(1), updated_at: daysAgo(1),
    },
  ]);

  const imgs = await uploadProductImages();
  console.log(`✅ Seeded: 2 users, 6 leads, 2 articles, ${imgs} product images`);
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
