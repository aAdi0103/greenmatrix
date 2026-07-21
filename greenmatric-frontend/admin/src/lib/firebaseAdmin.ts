import { getApps, initializeApp, cert, type AppOptions } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

// Admin SDK. Emulator path: FIREBASE_AUTH_EMULATOR_HOST / FIRESTORE_EMULATOR_HOST env
// vars make it connect locally with no creds. Real path: FIREBASE_SERVICE_ACCOUNT (JSON
// string) provides a service-account cert.
function init() {
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
  const opts: AppOptions = { storageBucket: bucket };
  if (sa) opts.credential = cert(JSON.parse(sa));
  else opts.projectId = process.env.GCLOUD_PROJECT || "greenmatrix-demo";
  return initializeApp(opts);
}

const app = getApps().length ? getApps()[0] : init();

export const adminAuth = getAuth(app);
export const adminDb = getFirestore(app);
export const adminStorage = getStorage(app);

// Verify the caller's ID token and require the admin role. Throws on failure.
export async function requireAdmin(req: Request): Promise<string> {
  const header = req.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) throw new Error("unauthorized");
  const decoded = await adminAuth.verifyIdToken(token);
  if (decoded.role !== "admin") throw new Error("forbidden");
  return decoded.uid;
}
