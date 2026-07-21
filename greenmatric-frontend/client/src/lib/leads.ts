import type { LeadSource } from "./types";

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
  company_website?: string; // honeypot
};

// Posts to the server route (the only write path into `leads`). Rules deny client writes.
export async function submitLead(input: LeadInput): Promise<void> {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || "failed");
}
