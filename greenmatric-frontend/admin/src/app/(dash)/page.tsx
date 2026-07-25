"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Download } from "lucide-react";
import { subscribeLeads, leadsToCsv, todayISO, toDate } from "@/lib/crm";
import { LEAD_STATUSES, LEAD_SOURCES, type Lead } from "@/lib/types";
import { Card, StatusBadge, Button, Spinner, PageHeader, StatCard } from "@/components/ui";

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
    { label: "New", value: counters.new },
    { label: "Contacted", value: counters.contacted },
    { label: "Follow-up due today", value: counters.dueToday },
    { label: "Won this month", value: counters.wonMonth },
  ];

  return (
    <div>
      <PageHeader title="Leads" subtitle="Every enquiry from the website, worked to close."
        actions={<Button variant="outline" onClick={exportCsv}><Download className="h-4 w-4" /> Export</Button>} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((c) => <StatCard key={c.label} label={c.label} value={c.value} />)}
      </div>

      <div className="mt-6 flex flex-wrap gap-2.5">
        <div className="relative min-w-64 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -tranzinc-y-1/2 text-zinc-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, city, product…"
            className="h-9 w-full rounded-lg border border-zinc-300 bg-white pl-9 pr-3 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 rounded-lg border border-zinc-300 bg-white px-3 text-sm capitalize">
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={source} onChange={(e) => setSource(e.target.value)} className="h-9 rounded-lg border border-zinc-300 bg-white px-3 text-sm">
          <option value="all">All sources</option>
          {LEAD_SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <Card className="mt-4 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-100 text-left text-xs font-medium uppercase tracking-wide text-zinc-400">
              <tr>
                <th className="px-4 py-2.5 font-medium">Date</th>
                <th className="px-4 py-2.5 font-medium">Name</th>
                <th className="px-4 py-2.5 font-medium">Phone</th>
                <th className="px-4 py-2.5 font-medium">Product</th>
                <th className="px-4 py-2.5 font-medium">City</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5 font-medium">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((l) => (
                <tr key={l.id} onClick={() => router.push(`/leads/${l.id}`)} className="cursor-pointer transition-colors hover:bg-zinc-50">
                  <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">{toDate(l.createdAt)?.toLocaleDateString() ?? "—"}</td>
                  <td className="px-4 py-3 font-medium text-zinc-900">
                    {l.name}
                    {l.status === "new" && <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-semibold text-blue-700">NEW</span>}
                  </td>
                  <td className="px-4 py-3 text-zinc-600">{l.phone}</td>
                  <td className="px-4 py-3 text-zinc-600">{l.productInterest ?? "—"}</td>
                  <td className="px-4 py-3 text-zinc-600">{l.city ?? "—"}</td>
                  <td className="px-4 py-3"><StatusBadge status={l.status} /></td>
                  <td className="px-4 py-3 text-zinc-400">{l.source}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-12 text-center text-zinc-400">No leads match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
