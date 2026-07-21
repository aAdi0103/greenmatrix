// Verifies the hardened lead model against the emulator:
//  - client SDK create is DENIED (rules create=false)
//  - client SDK read is DENIED (no public read)
//  - the /api/lead server route CREATES a lead (needs client dev server on :3000)
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator, collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";

const app = initializeApp({ projectId: "greenmatrix-demo", apiKey: "demo" });
const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);
let ok = true;

// 1) client create must be denied
try {
  await addDoc(collection(db, "leads"), { name: "X", phone: "+911234567890", status: "new", source: "web_form", sourcePage: "/x", createdAt: serverTimestamp() });
  ok = false; console.log("❌ client create ALLOWED (should be denied!)");
} catch (e) { console.log("✅ client create denied:", e.code); }

// 2) client read must be denied
try {
  await getDocs(collection(db, "leads"));
  ok = false; console.log("❌ client read ALLOWED (should be denied!)");
} catch (e) { console.log("✅ client read denied:", e.code); }

// 3) server route must accept a valid lead
try {
  const res = await fetch("http://localhost:3000/api/lead", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Route Check", phone: "+919999999999", sourcePage: "/emu-check" }),
  });
  if (res.ok) console.log("✅ /api/lead created lead:", (await res.json()));
  else { ok = false; console.log("❌ /api/lead failed:", res.status); }
} catch (e) { ok = false; console.log("❌ /api/lead unreachable (client dev server on :3000?):", e.message); }

console.log(ok ? "\nALL CHECKS PASSED" : "\nSOME CHECKS FAILED");
process.exit(ok ? 0 : 1);
