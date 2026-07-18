// Seed the Firebase emulator with demo data.
// Run: node greenmatric-frontend/seed.sh  (wrapper sets emulator env)
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const app = initializeApp({ projectId: process.env.GCLOUD_PROJECT || "greenmatrix-demo" });
const auth = getAuth(app);
const db = getFirestore(app);

const today = new Date().toISOString().slice(0, 10);
const daysAgo = (n) => new Date(Date.now() - n * 864e5);

async function ensureUser(email, role, name) {
  let u;
  try { u = await auth.getUserByEmail(email); }
  catch { u = await auth.createUser({ email, password: "password123", displayName: name }); }
  await auth.setCustomUserClaims(u.uid, { role });
  await db.collection("users").doc(u.uid).set({ name, email, role, active: true, createdAt: new Date() });
  return u.uid;
}

async function main() {
  await ensureUser("admin@greenmatrix.test", "admin", "Admin User");
  await ensureUser("rep@greenmatrix.test", "rep", "Sales Rep");

  // Clear existing demo leads/articles for idempotency.
  for (const c of ["leads", "articles"]) {
    const snap = await db.collection(c).get();
    await Promise.all(snap.docs.map((d) => d.ref.delete()));
  }

  const leads = [
    { name: "Rajesh Kumar", phone: "+919812345671", city: "Ranchi", state: "Jharkhand", productInterest: "Automatic Water RFC (Rinser–Filler–Capper)", capacity: "120 BPM", status: "new", source: "web_form", sourcePage: "/products/water-rfc", message: "Starting a 1000 sqft water plant.", createdAt: daysAgo(0) },
    { name: "Sunita Devi", phone: "+919812345672", city: "Bokaro", state: "Jharkhand", productInterest: "Mineral Water Plant (turnkey line)", capacity: "2000 LPH", status: "contacted", source: "whatsapp", sourcePage: "/solutions/water-plant", contacted: true, contactedAt: daysAgo(2), assignedTo: "Sales Rep", followUpDate: today, createdAt: daysAgo(3) },
    { name: "Mohammed Irfan", phone: "+919812345673", city: "Patna", state: "Bihar", productInterest: "Automatic Rotary BOPP Labeler", capacity: "18000 BPH", status: "quoted", source: "web_form", sourcePage: "/products/rotary-bopp-labeler", contacted: true, dealValue: 850000, createdAt: daysAgo(8) },
    { name: "Anil Sharma", phone: "+919812345674", city: "Kolkata", state: "West Bengal", productInterest: "20L Jar Line (turnkey line)", capacity: "600 JPH", status: "negotiation", source: "call_back", sourcePage: "/solutions/jar-line", contacted: true, dealValue: 1200000, createdAt: daysAgo(14) },
    { name: "Priya Singh", phone: "+919812345675", city: "Dhanbad", state: "Jharkhand", productInterest: "Automatic Shrink Wrapping Machine", capacity: "12 PPM", status: "won", source: "web_form", sourcePage: "/products/shrink-wrapping", contacted: true, dealValue: 450000, wonLostReason: "Best price + fast delivery", closedBy: "rep@greenmatrix.test", createdAt: daysAgo(20), updatedAt: new Date() },
    { name: "Vikram Rao", phone: "+919812345676", city: "Bhubaneswar", state: "Odisha", productInterest: "Water Purification System", capacity: "5000 LPH", status: "lost", source: "web_form", sourcePage: "/products/water-purification", contacted: true, wonLostReason: "Went with local vendor", createdAt: daysAgo(25) },
  ];
  for (const l of leads) {
    await db.collection("leads").add({ updatedAt: l.updatedAt ?? l.createdAt, ...l });
  }

  await db.collection("articles").add({
    title: "How to start a mineral water plant in India",
    slug: "how-to-start-a-water-plant",
    excerpt: "Licences, BIS/ISI, capacity and budget — a practical starter guide for entrepreneurs.",
    body: "<h2>Overview</h2><p>Starting a packaged drinking water plant needs the right licences, a compliant treatment line and the correct machine capacity for your market.</p><h2>Licences you need</h2><ul><li>BIS / ISI certification</li><li>FSSAI licence</li><li>Local pollution and water board approvals</li></ul><h2>Budget & capacity</h2><p>A small line starts around 1000–2000 LPH. Talk to us for a turnkey quote.</p>",
    tags: ["guide", "water plant", "licence"],
    seoTitle: "How to Start a Mineral Water Plant in India — Costs & Licences",
    seoMeta: "Step-by-step guide to starting a packaged water plant: BIS/ISI, FSSAI, capacity and budget.",
    status: "published",
    authorUid: "seed",
    publishedAt: daysAgo(2),
    createdAt: daysAgo(4),
    updatedAt: daysAgo(2),
  });
  await db.collection("articles").add({
    title: "Choosing the right labeling machine (draft)",
    slug: "choosing-a-labeling-machine",
    excerpt: "BOPP vs shrink sleeve vs sticker — which fits your bottle and budget.",
    body: "<p>Draft — comparison coming soon.</p>",
    tags: ["labeling"],
    status: "draft",
    authorUid: "seed",
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
  });

  console.log("✅ Seeded: 2 users, 6 leads, 2 articles");
  process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
