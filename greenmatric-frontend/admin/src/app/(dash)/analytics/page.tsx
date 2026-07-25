"use client";

import { useEffect, useMemo, useState } from "react";
import { useRequireAdmin } from "@/lib/guards";
import { subscribeLeads } from "@/lib/crm";
import { computeAnalytics } from "@/lib/analytics";
import type { Lead } from "@/lib/types";
import { Card, Spinner, PageHeader, StatCard } from "@/components/ui";

const RANGES = [
  { id: "7", label: "7 days" }, { id: "30", label: "30 days" },
  { id: "90", label: "90 days" }, { id: "all", label: "All time" },
];

function Bars({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <div className="space-y-2">
      {data.map((d) => (
        <div key={d.label} className="flex items-center gap-3 text-sm">
          <div className="w-28 shrink-0 truncate capitalize text-zinc-500">{d.label}</div>
          <div className="flex-1 rounded-full bg-zinc-100"><div className="h-2 rounded-full bg-zinc-900" style={{ width: `${(d.value / max) * 100}%` }} /></div>
          <div className="w-8 text-right font-medium text-zinc-700">{d.value}</div>
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

  const stats = useMemo(
    () => computeAnalytics(leads ?? [], range === "all" ? "all" : Number(range)),
    [leads, range],
  );

  if (!ready || role !== "admin" || leads === null) return <Spinner />;

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Lead pipeline, conversion and sources."
        actions={
          <div className="flex gap-1 rounded-lg border border-zinc-200 bg-white p-0.5">
            {RANGES.map((r) => (
              <button key={r.id} onClick={() => setRange(r.id)}
                className={`rounded-md px-2.5 py-1 text-sm transition ${range === r.id ? "bg-zinc-900 text-white" : "text-zinc-500 hover:text-zinc-900"}`}>
                {r.label}
              </button>
            ))}
          </div>
        } />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { l: "Total leads", v: stats.total },
          { l: "Worked", v: stats.worked },
          { l: "Won pipeline (₹)", v: stats.wonValue.toLocaleString("en-IN") },
          { l: "Win / loss", v: `${stats.won} / ${stats.lost}` },
        ].map((c) => <StatCard key={c.l} label={c.l} value={c.v} />)}
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <Card className="p-5">
          <h2 className="text-sm font-semibold mb-4">Conversion funnel</h2>
          <Bars data={stats.funnel} />
          <div className="mt-4 flex gap-4 text-xs text-zinc-400">
            {stats.funnel.slice(1).map((f, i) => {
              const prev = stats.funnel[i].value;
              return <span key={f.label}>{f.label}: {prev ? Math.round((f.value / prev) * 100) : 0}%</span>;
            })}
          </div>
        </Card>
        <Card className="p-5"><h2 className="text-sm font-semibold mb-4">By status</h2><Bars data={stats.byStatus} /></Card>
        <Card className="p-5"><h2 className="text-sm font-semibold mb-4">By source</h2><Bars data={stats.bySource} /></Card>
        <Card className="p-5"><h2 className="text-sm font-semibold mb-4">Top products</h2><Bars data={stats.byProduct} /></Card>
      </div>

      <Card className="mt-4 p-5 text-sm text-zinc-500">
        Website traffic (GA4) can embed here alongside these Supabase-computed metrics.
      </Card>
    </div>
  );
}
