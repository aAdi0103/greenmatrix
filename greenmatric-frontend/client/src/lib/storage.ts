// Public download URL for a Storage object path (public-read objects — no getDownloadURL call).
// Points at the emulator locally, at firebasestorage in prod.
export function storageUrl(path: string): string {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "";
  const host =
    process.env.NEXT_PUBLIC_USE_EMULATOR === "true"
      ? "http://127.0.0.1:9199"
      : "https://firebasestorage.googleapis.com";
  return `${host}/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
}
