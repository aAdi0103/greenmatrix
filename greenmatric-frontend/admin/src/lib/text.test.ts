import { describe, it, expect } from "vitest";
import { slugify } from "./text";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World!")).toBe("hello-world");
  });
  it("collapses non-alnum runs and trims edges", () => {
    expect(slugify("  A & B  ")).toBe("a-b");
    expect(slugify("Water RFC (30–400 BPM)")).toBe("water-rfc-30-400-bpm");
  });
});
