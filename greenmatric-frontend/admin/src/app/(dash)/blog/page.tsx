"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useRequireAdmin } from "@/lib/guards";
import { subscribeArticles, createArticle, deleteArticle } from "@/lib/blog";
import { toDate } from "@/lib/crm";
import type { Article } from "@/lib/types";
import { Plus } from "lucide-react";
import { Card, Button, Spinner, PageHeader } from "@/components/ui";

export default function BlogListPage() {
  const { ready, role } = useRequireAdmin();
  const { user } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => subscribeArticles(setArticles), []);

  if (!ready || role !== "admin" || articles === null) return <Spinner />;

  const shown = search.trim()
    ? articles.filter((a) => a.title.toLowerCase().includes(search.toLowerCase()))
    : articles;

  async function newArticle() {
    if (!user) return;
    const id = await createArticle(user.uid);
    router.push(`/blog/${id}`);
  }

  async function remove(id: string) {
    if (confirm("Delete this article? This cannot be undone.")) await deleteArticle(id);
  }

  return (
    <div>
      <PageHeader title="Blog" subtitle="Write and publish articles to the public site."
        actions={<Button onClick={newArticle}><Plus className="h-4 w-4" /> New article</Button>} />
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title…"
        className="h-9 w-full max-w-sm rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" />

      <Card className="mt-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {shown.map((a) => (
              <tr key={a.id} className="hover:bg-zinc-50">
                <td className="px-4 py-3 font-medium cursor-pointer" onClick={() => router.push(`/blog/${a.id}`)}>{a.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${a.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-500"}`}>{a.status}</span>
                </td>
                <td className="px-4 py-3 text-zinc-500">{toDate(a.updatedAt)?.toLocaleDateString() ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => router.push(`/blog/${a.id}`)} className="text-emerald-600 hover:underline mr-3">Edit</button>
                  <button onClick={() => remove(a.id!)} className="text-rose-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-zinc-400">No articles yet.</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
