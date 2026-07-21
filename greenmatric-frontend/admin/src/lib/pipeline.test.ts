import { describe, it, expect } from "vitest";
import { PIPELINE, LEAD_STATUSES } from "./types";

describe("lead pipeline transitions", () => {
  it("new can advance to contacted or lost, not straight to won", () => {
    expect(PIPELINE.new).toContain("contacted");
    expect(PIPELINE.new).toContain("lost");
    expect(PIPELINE.new).not.toContain("won");
  });
  it("won and lost are terminal", () => {
    expect(PIPELINE.won).toHaveLength(0);
    expect(PIPELINE.lost).toHaveLength(0);
  });
  it("every transition target is a known status", () => {
    for (const targets of Object.values(PIPELINE))
      for (const t of targets) expect(LEAD_STATUSES).toContain(t);
  });
});
