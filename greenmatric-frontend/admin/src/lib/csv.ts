import { toDate } from "./dates";
import type { Lead } from "./types";

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
