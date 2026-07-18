"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useRequireAdmin } from "@/lib/guards";
import { subscribeArticles, createArticle, deleteArticle } from "@/lib/blog";
import { toDate } from "@/lib/crm";
import type { Article } from "@/lib/types";
import { Card, Button, Spinner } from "@/components/ui";

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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Button onClick={newArticle}>New article</Button>
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search title…"
        className="mt-4 w-full max-w-sm rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500" />

      <Card className="mt-4 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr><th className="px-4 py-3">Title</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Updated</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {shown.map((a) => (
              <tr key={a.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium cursor-pointer" onClick={() => router.push(`/blog/${a.id}`)}>{a.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${a.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{a.status}</span>
                </td>
                <td className="px-4 py-3 text-slate-500">{toDate(a.updatedAt)?.toLocaleDateString() ?? "—"}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => router.push(`/blog/${a.id}`)} className="text-emerald-600 hover:underline mr-3">Edit</button>
                  <button onClick={() => remove(a.id!)} className="text-rose-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan={4} className="px-4 py-10 text-center text-slate-400">No articles yet.</td></tr>}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
