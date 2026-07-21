import "server-only";
import { adminDb } from "./firebaseAdmin";

// Server-side published-article reads (Admin SDK) for SSR/ISR + real SEO.
export type PublicArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  body: string;
  tags?: string[];
  seoTitle?: string;
  seoMeta?: string;
  publishedAtISO?: string;
};

function toPublic(id: string, d: FirebaseFirestore.DocumentData): PublicArticle {
  const pub = d.publishedAt?.toDate?.() as Date | undefined;
  return {
    id,
    title: d.title ?? "",
    slug: d.slug ?? "",
    excerpt: d.excerpt ?? "",
    coverImage: d.coverImage ?? "",
    body: d.body ?? "",
    tags: d.tags ?? [],
    seoTitle: d.seoTitle ?? "",
    seoMeta: d.seoMeta ?? "",
    publishedAtISO: pub ? pub.toISOString() : undefined,
  };
}

// Errors (e.g. DB unreachable at build) degrade to empty so builds never fail; ISR fills later.
export async function listPublished(): Promise<PublicArticle[]> {
  try {
    const snap = await adminDb
      .collection("articles")
      .where("status", "==", "published")
      .orderBy("publishedAt", "desc")
      .limit(50)
      .get();
    return snap.docs.map((d) => toPublic(d.id, d.data()));
  } catch {
    return [];
  }
}

export async function getPublishedBySlug(slug: string): Promise<PublicArticle | null> {
  try {
    const snap = await adminDb
      .collection("articles")
      .where("slug", "==", slug)
      .where("status", "==", "published")
      .limit(1)
      .get();
    if (snap.empty) return null;
    const d = snap.docs[0];
    return toPublic(d.id, d.data());
  } catch {
    return null;
  }
}
