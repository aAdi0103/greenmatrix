"use client";

import { useEffect, useMemo, useState } from "react";
import { useRequireAdmin } from "@/lib/guards";
import { subscribeLeads, toDate } from "@/lib/crm";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "@/lib/types";
import { Card, Spinner } from "@/components/ui";

const RANGES = [
  { id: "7", label: "7 days" }, { id: "30", label: "30 days" },
  { id: "90", label: "90 days" }, { id: "all", label: "All time" },
];
const ORDER: LeadStatus[] = ["new", "contacted", "qualified", "quoted", "negotiation", "won"];
const idx = (s: LeadStatus) => ORDER.indexOf(s); // lost => -1

function Bars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3 text-sm">
          <div className="w-28 shrink-0 capitalize text-slate-500">{d.label}</div>
          <div className="flex-1 rounded bg-slate-100"><div className="h-5 rounded bg-emerald-500" style={{ width: `${(d.value / max) * 100}%` }} /></div>
          <div className="w-8 text-right font-medium">{d.value}</div>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const { ready, role } = useRequireAdmin();
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [range, setRange] = useState("30");

  useEffect(() => subscribeLeads(setLeads), []);

  const stats = useMemo(() => {
    let l = leads ?? [];
    if (range !== "all") {
      const cutoff = Date.now() - Number(range) * 864e5;
      l = l.filter((x) => (toDate(x.createdAt)?.getTime() ?? 0) >= cutoff);
    }
    const total = l.length;
    const worked = l.filter((x) => x.status !== "new").length;
    const byStatus = LEAD_STATUSES.map((s) => ({ label: s, value: l.filter((x) => x.status === s).length }));
    const bySourceMap: Record<string, number> = {};
    const byProductMap: Record<string, number> = {};
    l.forEach((x) => {
      bySourceMap[x.source] = (bySourceMap[x.source] ?? 0) + 1;
      const p = x.productInterest || "—";
      byProductMap[p] = (byProductMap[p] ?? 0) + 1;
    });
    const bySource = Object.entries(bySourceMap).map(([label, value]) => ({ label, value }));
    const byProduct = Object.entries(byProductMap).map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value).slice(0, 8);

    const reached = (k: number) => l.filter((x) => idx(x.status) >= k).length;
    const funnel = [
      { label: "New", value: total },
      { label: "Contacted", value: reached(1) },
      { label: "Quoted", value: reached(3) },
      { label: "Won", value: reached(5) },
    ];
    const wonValue = l.filter((x) => x.status === "won").reduce((s, x) => s + (x.dealValue ?? 0), 0);
    const won = l.filter((x) => x.status === "won").length;
    const lost = l.filter((x) => x.status === "lost").length;

    return { total, worked, byStatus, bySource, byProduct, funnel, wonValue, won, lost };
  }, [leads, range]);

  if (!ready || role !== "admin" || leads === null) return <Spinner />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex gap-1">
          {RANGES.map((r) => (
            <button key={r.id} onClick={() => setRange(r.id)}
              className={`rounded-lg px-3 py-1.5 text-sm ${range === r.id ? "bg-emerald-600 text-white" : "border border-slate-300 text-slate-600 hover:bg-slate-50"}`}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { l: "Total leads", v: stats.total },
          { l: "Worked", v: stats.worked },
          { l: "Won pipeline (₹)", v: stats.wonValue.toLocaleString("en-IN") },
          { l: "Win / loss", v: `${stats.won} / ${stats.lost}` },
        ].map((c) => (
          <Card key={c.l} className="p-5"><div className="text-sm text-slate-500">{c.l}</div><div className="mt-1 text-2xl font-bold">{c.v}</div></Card>
        ))}
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <h2 className="font-semibold mb-4">Conversion funnel</h2>
          <Bars data={stats.funnel} />
          <div className="mt-4 flex gap-4 text-xs text-slate-500">
            {stats.funnel.slice(1).map((f, i) => {
              const prev = stats.funnel[i].value;
              return <span key={f.label}>{f.label}: {prev ? Math.round((f.value / prev) * 100) : 0}%</span>;
            })}
          </div>
        </Card>
        <Card className="p-5"><h2 className="font-semibold mb-4">By status</h2><Bars data={stats.byStatus} /></Card>
        <Card className="p-5"><h2 className="font-semibold mb-4">By source</h2><Bars data={stats.bySource} /></Card>
        <Card className="p-5"><h2 className="font-semibold mb-4">Top products</h2><Bars data={stats.byProduct} /></Card>
      </div>

      <Card className="mt-6 p-5 text-sm text-slate-500">
        Website traffic (GA4) embeds here in Phase 3, alongside these Firestore-computed metrics.
      </Card>
    </div>
  );
}
