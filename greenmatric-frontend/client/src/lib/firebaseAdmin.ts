import { getApps, initializeApp, cert, type AppOptions } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Server-only Admin SDK for the lead write path (and SSR blog reads).
// Emulator: FIRESTORE_EMULATOR_HOST env connects locally. Real: FIREBASE_SERVICE_ACCOUNT.
function init() {
  const sa = process.env.FIREBASE_SERVICE_ACCOUNT;
  const opts: AppOptions = { storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET };
  if (sa) opts.credential = cert(JSON.parse(sa));
  else opts.projectId = process.env.GCLOUD_PROJECT || "greenmatrix-demo";
  return initializeApp(opts);
}

const app = getApps().length ? getApps()[0] : init();
export const adminDb = getFirestore(app);
