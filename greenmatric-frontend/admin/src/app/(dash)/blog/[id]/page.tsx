"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRequireAdmin } from "@/lib/guards";
import {
  getArticle, saveArticle, publishArticle, unpublishArticle, deleteArticle,
  uploadImage, slugify,
} from "@/lib/blog";
import type { Article } from "@/lib/types";
import { Card, Button, Field, Spinner } from "@/components/ui";
import { Editor } from "@/components/Editor";

const CLIENT_URL = "http://localhost:3000";

export default function ArticleEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { ready, role } = useRequireAdmin();
  const router = useRouter();
  const [a, setA] = useState<Article | null | "loading">("loading");
  const [tags, setTags] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    getArticle(id).then((doc) => {
      setA(doc);
      if (doc) setTags((doc.tags ?? []).join(", "));
    });
  }, [id]);

  if (!ready || role !== "admin" || a === "loading") return <Spinner />;
  if (!a) return <div><h1 className="text-xl font-bold">Article not found</h1><Link href="/blog" className="text-emerald-600">← Back</Link></div>;

  const art = a;
  const set = (p: Partial<Article>) => setA({ ...art, ...p });

  function onTitle(v: string) {
    set({ title: v, ...(slugTouched ? {} : { slug: slugify(v) }) });
  }

  async function save(showMsg = true) {
    setSaving(true);
    await saveArticle(id, {
      title: art.title, slug: art.slug, excerpt: art.excerpt, body: art.body,
      coverImage: art.coverImage, seoTitle: art.seoTitle, seoMeta: art.seoMeta,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    setSaving(false);
    if (showMsg) { setMsg("Saved"); setTimeout(() => setMsg(""), 1500); }
  }

  async function onPublish() {
    await save(false);
    await publishArticle(id);
    set({ status: "published" });
    setMsg("Published — live on the website");
    setTimeout(() => setMsg(""), 2500);
  }
  async function onUnpublish() {
    await unpublishArticle(id);
    set({ status: "draft" });
    setMsg("Unpublished");
    setTimeout(() => setMsg(""), 1500);
  }
  async function onDelete() {
    if (confirm("Delete this article?")) { await deleteArticle(id); router.push("/blog"); }
  }
  async function onCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(id, file);
    set({ coverImage: url });
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/blog" className="text-sm text-slate-500 hover:text-slate-700">← All articles</Link>
        <div className="flex items-center gap-2">
          {msg && <span className="text-sm text-emerald-600">{msg}</span>}
          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${art.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{art.status}</span>
          <Button variant="outline" onClick={() => save()} disabled={saving}>{saving ? "Saving…" : "Save"}</Button>
          {art.status === "published"
            ? <Button variant="outline" onClick={onUnpublish}>Unpublish</Button>
            : <Button onClick={onPublish}>Publish</Button>}
          <Button variant="danger" onClick={onDelete}>Delete</Button>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Field label="Title" name="title" value={art.title} onChange={onTitle} />
          <div className="text-sm">
            <div className="mb-1 text-xs font-medium text-slate-500">Body</div>
            <Editor value={art.body} onChange={(html) => set({ body: html })} />
          </div>
        </div>

        <div className="space-y-4">
          <Card className="p-4 space-y-3">
            <Field label="Slug" name="slug" value={art.slug} onChange={(v) => { setSlugTouched(true); set({ slug: slugify(v) }); }} />
            {art.status === "published" && (
              <a href={`${CLIENT_URL}/resources/${art.slug}`} target="_blank" className="block text-xs text-emerald-600 hover:underline">View live →</a>
            )}
            <Field label="Excerpt" name="excerpt" textarea value={art.excerpt ?? ""} onChange={(v) => set({ excerpt: v })} />
            <Field label="Tags (comma-separated)" name="tags" value={tags} onChange={setTags} />
          </Card>

          <Card className="p-4 space-y-3">
            <div className="text-xs font-medium text-slate-500">Cover image</div>
            {art.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={art.coverImage} alt="cover" className="h-32 w-full rounded-lg object-cover" />
            )}
            <input type="file" accept="image/*" onChange={onCover} className="text-sm" />
          </Card>

          <Card className="p-4 space-y-3">
            <div className="text-xs font-medium text-slate-500">SEO</div>
            <Field label="SEO title" name="seoTitle" value={art.seoTitle ?? ""} onChange={(v) => set({ seoTitle: v })} />
            <Field label="Meta description" name="seoMeta" textarea value={art.seoMeta ?? ""} onChange={(v) => set({ seoMeta: v })} />
          </Card>
        </div>
      </div>
    </div>
  );
}
