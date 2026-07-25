import { supabase } from "./supabase";
import type { Article } from "./types";

export { slugify } from "./text";

type Row = Record<string, unknown>;

function rowToArticle(r: Row): Article {
  return {
    id: r.id as string,
    title: r.title as string, slug: r.slug as string,
    coverImage: (r.cover_image as string) ?? "",
    body: (r.body as string) ?? "",
    excerpt: (r.excerpt as string) ?? "",
    seoTitle: (r.seo_title as string) ?? "",
    seoMeta: (r.seo_meta as string) ?? "",
    tags: (r.tags as string[]) ?? [],
    status: r.status as Article["status"],
    authorUid: r.author_uid as string,
    publishedAt: r.published_at, createdAt: r.created_at, updatedAt: r.updated_at,
  };
}

const COLMAP: Record<string, string> = {
  coverImage: "cover_image", seoTitle: "seo_title", seoMeta: "seo_meta",
  publishedAt: "published_at", authorUid: "author_uid",
};
function articleToRow(patch: Partial<Article>): Row {
  const row: Row = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined || k === "id" || k === "createdAt" || k === "updatedAt") continue;
    row[COLMAP[k] ?? k] = v;
  }
  return row;
}

export function subscribeArticles(cb: (a: Article[]) => void) {
  const load = async () => {
    const { data } = await supabase.from("articles").select("*").order("updated_at", { ascending: false });
    cb((data ?? []).map(rowToArticle));
  };
  load();
  const ch = supabase.channel("articles-changes")
    .on("postgres_changes", { event: "*", schema: "public", table: "articles" }, load)
    .subscribe();
  return () => { supabase.removeChannel(ch); };
}

export async function getArticle(id: string): Promise<Article | null> {
  const { data } = await supabase.from("articles").select("*").eq("id", id).maybeSingle();
  return data ? rowToArticle(data) : null;
}

export async function createArticle(authorUid: string): Promise<string> {
  const { data, error } = await supabase.from("articles")
    .insert({ title: "Untitled article", slug: `untitled-${Date.now()}`, body: "", status: "draft", author_uid: authorUid })
    .select("id").single();
  if (error) throw error;
  return data.id as string;
}

export async function saveArticle(id: string, patch: Partial<Article>) {
  await supabase.from("articles").update({ ...articleToRow(patch), updated_at: new Date().toISOString() }).eq("id", id);
}

export async function publishArticle(id: string) {
  await supabase.from("articles").update({ status: "published", published_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq("id", id);
}

export async function unpublishArticle(id: string) {
  await supabase.from("articles").update({ status: "draft", updated_at: new Date().toISOString() }).eq("id", id);
}

export async function deleteArticle(id: string) {
  await supabase.from("articles").delete().eq("id", id);
}

export async function uploadImage(articleId: string, file: File): Promise<string> {
  const path = `${articleId}/${Date.now()}-${file.name}`;
  const { error } = await supabase.storage.from("blog").upload(path, file, { upsert: true });
  if (error) throw error;
  return supabase.storage.from("blog").getPublicUrl(path).data.publicUrl;
}
