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

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

// Firestore Timestamp | undefined -> Date | null
export function toDate(ts: unknown): Date | null {
  if (ts && typeof ts === "object" && "toDate" in ts) return (ts as { toDate: () => Date }).toDate();
  return null;
}

export function leadsToCsv(leads: Lead[]): string {
  const cols = ["createdAt", "name", "phone", "email", "city", "state", "productInterest", "capacity", "status", "source", "sourcePage", "assignedTo", "dealValue"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const rows = leads.map((l) =>
    cols.map((c) => {
      if (c === "createdAt") return esc(toDate(l.createdAt)?.toISOString() ?? "");
      return esc(l[c as keyof Lead]);
    }).join(","),
  );
  return [cols.join(","), ...rows].join("\n");
}
