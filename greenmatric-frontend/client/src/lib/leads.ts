import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import type { Lead, LeadSource } from "./types";

export type LeadInput = {
  name: string;
  phone: string;
  email?: string;
  company?: string;
  city?: string;
  state?: string;
  productInterest?: string;
  capacity?: string;
  message?: string;
  source?: LeadSource;
  sourcePage: string;
};

// Writes a lead to Firestore (status=new). Public create is allowed by security rules.
// ponytail: direct client write for now; a rate-limited server route wraps this in M4.
export async function submitLead(input: LeadInput): Promise<void> {
  const doc: Lead = {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email?.trim() || undefined,
    company: input.company?.trim() || undefined,
    city: input.city?.trim() || undefined,
    state: input.state?.trim() || undefined,
    productInterest: input.productInterest || undefined,
    capacity: input.capacity || undefined,
    message: input.message?.trim() || undefined,
    source: input.source ?? "web_form",
    sourcePage: input.sourcePage,
    status: "new",
  };
  // Drop undefined keys (Firestore rejects them).
  const clean = Object.fromEntries(Object.entries(doc).filter(([, v]) => v !== undefined));
  await addDoc(collection(db, "leads"), {
    ...clean,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
