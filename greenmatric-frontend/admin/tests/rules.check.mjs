// Firestore security-rules checks against the running emulator.
// Run via test.sh (emulator must be up). Not a *.test.ts so vitest ignores it.
import { initializeTestEnvironment, assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { readFileSync } from "node:fs";
import { doc, setDoc, getDoc, getDocs, addDoc, updateDoc, collection } from "firebase/firestore";

const rules = readFileSync(new URL("../../firestore.rules", import.meta.url), "utf8");
const env = await initializeTestEnvironment({
  projectId: "gm-rules-test",
  firestore: { host: "127.0.0.1", port: 8080, rules },
});

const unauth = env.unauthenticatedContext().firestore();
const rep = env.authenticatedContext("rep1", { role: "rep" }).firestore();
const admin = env.authenticatedContext("admin1", { role: "admin" }).firestore();

// Seed fixtures with rules disabled.
await env.withSecurityRulesDisabled(async (ctx) => {
  const db = ctx.firestore();
  await setDoc(doc(db, "articles/pub"), { status: "published", title: "P", slug: "p" });
  await setDoc(doc(db, "articles/draft"), { status: "draft", title: "D", slug: "d" });
  await setDoc(doc(db, "leads/l1"), { name: "a", phone: "b", status: "new" });
  await setDoc(doc(db, "leads/l1/notes/n1"), { text: "x", authorUid: "u", authorName: "n" });
});

const cases = [
  ["unauth cannot read leads", () => assertFails(getDocs(collection(unauth, "leads")))],
  ["unauth cannot create lead (create=false)", () => assertFails(addDoc(collection(unauth, "leads"), { name: "a", phone: "b", status: "new" }))],
  ["rep can read leads", () => assertSucceeds(getDocs(collection(rep, "leads")))],
  ["rep can update a lead", () => assertSucceeds(setDoc(doc(rep, "leads/l1"), { feedback: "called" }, { merge: true }))],
  ["rep cannot write articles", () => assertFails(setDoc(doc(rep, "articles/x"), { status: "draft" }))],
  ["admin can write articles", () => assertSucceeds(setDoc(doc(admin, "articles/x"), { status: "draft", slug: "x" }))],
  ["public reads a published article", () => assertSucceeds(getDoc(doc(unauth, "articles/pub")))],
  ["public cannot read a draft", () => assertFails(getDoc(doc(unauth, "articles/draft")))],
  ["notes are immutable", () => assertFails(updateDoc(doc(rep, "leads/l1/notes/n1"), { text: "edited" }))],
];

let ok = true;
for (const [desc, run] of cases) {
  try { await run(); console.log("✅", desc); }
  catch (e) { ok = false; console.log("❌", desc, "-", e.message); }
}
await env.cleanup();
console.log(ok ? "\nRULES: ALL PASSED" : "\nRULES: FAILURES");
process.exit(ok ? 0 : 1);
