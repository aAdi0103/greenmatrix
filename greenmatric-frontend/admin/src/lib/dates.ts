export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// Timestamp (ISO string from Postgres, Date, or Firestore-style {toDate}) -> Date | null.
export function toDate(ts: unknown): Date | null {
  if (!ts) return null;
  if (ts instanceof Date) return ts;
  if (typeof ts === "string") { const d = new Date(ts); return isNaN(+d) ? null : d; }
  if (typeof ts === "object" && "toDate" in ts) return (ts as { toDate: () => Date }).toDate();
  return null;
}
