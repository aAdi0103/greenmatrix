// Verifies the lead security model against the emulator: public create allowed, public read denied.
import { initializeApp } from "firebase/app";
import {
  getFirestore, connectFirestoreEmulator, collection, addDoc, getDocs, serverTimestamp,
} from "firebase/firestore";

const app = initializeApp({ projectId: "greenmatrix-demo", apiKey: "demo" });
const db = getFirestore(app);
connectFirestoreEmulator(db, "127.0.0.1", 8080);

let ok = true;

// 1) public create (== submitLead)
try {
  const ref = await addDoc(collection(db, "leads"), {
    name: "Emu Check", phone: "+919999999999", status: "new",
    source: "web_form", sourcePage: "/emu-check",
    createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
  console.log("✅ public lead create OK:", ref.id);
} catch (e) {
  ok = false; console.log("❌ create failed:", e.code || e.message);
}

// 2) public read must be denied
try {
  await getDocs(collection(db, "leads"));
  ok = false; console.log("❌ public read ALLOWED (should be denied!)");
} catch (e) {
  console.log("✅ public read denied as expected:", e.code);
}

// 3) invalid create (missing phone) must be denied by rules
try {
  await addDoc(collection(db, "leads"), { name: "no phone", status: "new" });
  ok = false; console.log("❌ invalid create ALLOWED (should be denied!)");
} catch (e) {
  console.log("✅ invalid create denied as expected:", e.code);
}

console.log(ok ? "\nALL CHECKS PASSED" : "\nSOME CHECKS FAILED");
process.exit(ok ? 0 : 1);
