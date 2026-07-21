import { describe, it, expect } from "vitest";
import { leadsToCsv } from "./csv";
import type { Lead } from "./types";

describe("leadsToCsv", () => {
  const lead: Lead = {
    name: 'A "quoted" name', phone: "+91981", status: "new", source: "web_form",
    sourcePage: "/", city: "Bokaro", createdAt: { toDate: () => new Date("2026-01-01T00:00:00Z") },
  };
  const csv = leadsToCsv([lead]);

  it("has a header row + one data row", () => {
    const lines = csv.split("\n");
    expect(lines).toHaveLength(2);
    expect(lines[0]).toContain("name");
  });
  it("escapes embedded quotes", () => {
    expect(csv).toContain('"A ""quoted"" name"');
  });
  it("serialises createdAt as ISO", () => {
    expect(csv).toContain("2026-01-01T00:00:00.000Z");
  });
});
