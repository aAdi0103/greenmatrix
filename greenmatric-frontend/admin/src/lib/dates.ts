export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

// Firestore Timestamp | undefined -> Date | null (firebase-free, unit-testable).
export function toDate(ts: unknown): Date | null {
  if (ts && typeof ts === "object" && "toDate" in ts) return (ts as { toDate: () => Date }).toDate();
  return null;
}
