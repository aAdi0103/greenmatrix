import { describe, it, expect } from "vitest";
import { computeAnalytics } from "./analytics";
import type { Lead } from "./types";

const mk = (status: Lead["status"], extra: Partial<Lead> = {}): Lead => ({
  name: "x", phone: "+919812345678", status, source: "web_form", sourcePage: "/",
  createdAt: { toDate: () => new Date() }, ...extra,
});

describe("computeAnalytics", () => {
  const leads = [
    mk("new"), mk("contacted"), mk("quoted"),
    mk("won", { dealValue: 1000 }), mk("lost"),
  ];
  const a = computeAnalytics(leads, "all");

  it("counts totals and worked", () => {
    expect(a.total).toBe(5);
    expect(a.worked).toBe(4); // everything except `new`
  });
  it("sums won value and win/loss", () => {
    expect(a.wonValue).toBe(1000);
    expect(a.won).toBe(1);
    expect(a.lost).toBe(1);
  });
  it("builds the funnel (lost excluded from progression)", () => {
    const [n, c, q, w] = a.funnel.map((f) => f.value);
    expect(n).toBe(5);   // New = total
    expect(c).toBe(3);   // contacted, quoted, won
    expect(q).toBe(2);   // quoted, won
    expect(w).toBe(1);   // won
  });
});
