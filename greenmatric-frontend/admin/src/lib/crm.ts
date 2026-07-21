import { db } from "./firebase";
import {
  collection, query, orderBy, onSnapshot, doc, updateDoc, addDoc,
  serverTimestamp, getDoc,
} from "firebase/firestore";
import type { Lead, LeadNote } from "./types";

export function subscribeLeads(cb: (leads: Lead[]) => void) {
  const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Lead) }))));
}

export async function getLead(id: string): Promise<Lead | null> {
  const s = await getDoc(doc(db, "leads", id));
  return s.exists() ? { id: s.id, ...(s.data() as Lead) } : null;
}

export async function updateLead(id: string, patch: Partial<Lead>) {
  await updateDoc(doc(db, "leads", id), { ...patch, updatedAt: serverTimestamp() });
}

export function subscribeNotes(id: string, cb: (notes: LeadNote[]) => void) {
  const q = query(collection(db, "leads", id, "notes"), orderBy("createdAt", "asc"));
  return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as LeadNote) }))));
}

export async function addNote(id: string, text: string, authorUid: string, authorName: string) {
  await addDoc(collection(db, "leads", id, "notes"), {
    text, authorUid, authorName, createdAt: serverTimestamp(),
  });
}

export { toDate, todayISO } from "./dates";
export { leadsToCsv } from "./csv";
