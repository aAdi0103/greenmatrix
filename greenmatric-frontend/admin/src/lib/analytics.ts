import { toDate } from "./dates";
import { LEAD_STATUSES, type Lead, type LeadStatus } from "./types";

const ORDER: LeadStatus[] = ["new", "contacted", "qualified", "quoted", "negotiation", "won"];
const idx = (s: LeadStatus) => ORDER.indexOf(s); // lost => -1

export type Bar = { label: string; value: number };
export type Analytics = {
  total: number;
  worked: number;
  byStatus: Bar[];
  bySource: Bar[];
  byProduct: Bar[];
  funnel: Bar[];
  wonValue: number;
  won: number;
  lost: number;
};

// Pure reducer over leads within a day-range ("all" = no cutoff).
export function computeAnalytics(leads: Lead[], range: number | "all"): Analytics {
  let l = leads;
  if (range !== "all") {
    const cutoff = Date.now() - range * 864e5;
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
}
