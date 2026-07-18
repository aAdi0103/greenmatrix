import { db } from "./firebase";
import { collection, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import type { Article } from "./types";

// ponytail: client-side reads for the demo (works with emulator). SSR/ISR for blog SEO
// needs the Admin SDK server-side — deferred to Phase 3 with the real Firebase project.

export async function listPublished(): Promise<Article[]> {
  const q = query(
    collection(db, "articles"),
    where("status", "==", "published"),
    orderBy("publishedAt", "desc"),
    limit(50),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Article) }));
}

export async function getPublishedBySlug(slug: string): Promise<Article | null> {
  const q = query(
    collection(db, "articles"),
    where("slug", "==", slug),
    where("status", "==", "published"),
    limit(1),
  );
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, ...(d.data() as Article) };
}
