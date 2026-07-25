import "server-only";
import { supabaseAnon } from "./supabaseServer";

// Server-side published-article reads for SSR/ISR + real SEO. RLS permits public read of published.
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

type Row = Record<string, unknown>;
function toPublic(r: Row): PublicArticle {
  return {
    id: r.id as string,
    title: (r.title as string) ?? "",
    slug: (r.slug as string) ?? "",
    excerpt: (r.excerpt as string) ?? "",
    coverImage: (r.cover_image as string) ?? "",
    body: (r.body as string) ?? "",
    tags: (r.tags as string[]) ?? [],
    seoTitle: (r.seo_title as string) ?? "",
    seoMeta: (r.seo_meta as string) ?? "",
    publishedAtISO: (r.published_at as string) ?? undefined,
  };
}

// Errors degrade to empty so builds never fail; ISR fills later.
export async function listPublished(): Promise<PublicArticle[]> {
  try {
    const { data, error } = await supabaseAnon
      .from("articles").select("*").eq("status", "published")
      .order("published_at", { ascending: false }).limit(50);
    if (error) throw error;
    return (data ?? []).map(toPublic);
  } catch {
    return [];
  }
}

export async function getPublishedBySlug(slug: string): Promise<PublicArticle | null> {
  try {
    const { data, error } = await supabaseAnon
      .from("articles").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    if (error) throw error;
    return data ? toPublic(data) : null;
  } catch {
    return null;
  }
}
