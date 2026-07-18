"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { subscribeLeads, leadsToCsv, todayISO, toDate } from "@/lib/crm";
import { LEAD_STATUSES, LEAD_SOURCES, type Lead } from "@/lib/types";
import { Card, StatusBadge, Button, Spinner } from "@/components/ui";

export default function DashboardPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [status, setStatus] = useState("all");
  const [source, setSource] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => subscribeLeads(setLeads), []);

  const counters = useMemo(() => {
    const l = leads ?? [];
    const today = todayISO();
    const now = new Date();
    return {
      new: l.filter((x) => x.status === "new").length,
      contacted: l.filter((x) => x.status === "contacted").length,
      dueToday: l.filter((x) => x.followUpDate === today && x.status !== "won" && x.status !== "lost").length,
      wonMonth: l.filter((x) => {
        if (x.status !== "won") return false;
        const d = toDate(x.updatedAt);
        return d && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length,
    };
  }, [leads]);

  const filtered = useMemo(() => {
    let l = leads ?? [];
    if (status !== "all") l = l.filter((x) => x.status === status);
    if (source !== "all") l = l.filter((x) => x.source === source);
    if (search.trim()) {
      const s = search.toLowerCase();
      l = l.filter((x) =>
        [x.name, x.phone, x.city, x.productInterest].some((f) => f?.toLowerCase().includes(s)),
      );
    }
    return l;
  }, [leads, status, source, search]);

  function exportCsv() {
    const blob = new Blob([leadsToCsv(filtered)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${todayISO()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (leads === null) return <Spinner />;

  const cards = [
    { label: "New", value: counters.new, tone: "text-blue-600" },
    { label: "Contacted", value: counters.contacted, tone: "text-amber-600" },
    { label: "Follow-up due today", value: counters.dueToday, tone: "text-orange-600" },
    { label: "Won this month", value: counters.wonMonth, tone: "text-emerald-600" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <Card key={c.label} className="p-5">
            <div className="text-sm text-slate-500">{c.label}</div>
            <div className={`mt-1 text-3xl font-bold ${c.tone}`}>{c.value}</div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, city, product…"
          className="min-w-64 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm capitalize">
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm">
          <option value="all">All sources</option>
          {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <Card className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">City</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((l) => (
                <tr key={l.id} onClick={() => router.push(`/leads/${l.id}`)} className="cursor-pointer hover:bg-slate-50">
                  <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{toDate(l.createdAt)?.toLocaleDateString() ?? "—"}</td>
                  <td className="px-4 py-3 font-medium">
                    {l.name}
                    {l.status === "new" && <span className="ml-2 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">NEW</span>}
                  </td>
                  <td className="px-4 py-3">{l.phone}</td>
                  <td className="px-4 py-3 text-slate-600">{l.productInterest ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-600">{l.city ?? "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3 text-slate-500">{l.source}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400">No leads match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
