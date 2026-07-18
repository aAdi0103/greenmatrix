import { getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Admin SDK. With the emulator, FIREBASE_AUTH_EMULATOR_HOST / FIRESTORE_EMULATOR_HOST
// env vars make it connect locally without credentials. Phase 3 swaps in a real cert.
const app = getApps().length
  ? getApps()[0]
  : initializeApp({ projectId: process.env.GCLOUD_PROJECT || "greenmatrix-demo" });

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);

// Verify the caller's ID token and require the admin role. Throws on failure.
export async function requireAdmin(req: Request): Promise<string> {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) throw new Error("unauthorized");
  const decoded = await adminAuth.verifyIdToken(token);
  if (decoded.role !== "admin") throw new Error("forbidden");
  return decoded.uid;
}
