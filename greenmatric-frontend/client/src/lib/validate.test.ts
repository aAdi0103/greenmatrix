import { describe, it, expect } from "vitest";
import { isValidLead, isValidPhone } from "./validate";

describe("lead validation", () => {
  it("accepts a name + plausible phone", () => {
    expect(isValidLead("Ravi", "+919812345678")).toBe(true);
    expect(isValidLead("Ravi", "9812345678")).toBe(true);
  });
  it("rejects empty name or short/garbage phone", () => {
    expect(isValidLead("", "+919812345678")).toBe(false);
    expect(isValidLead("Ravi", "123")).toBe(false);
    expect(isValidLead("Ravi", "abcdefgh")).toBe(false);
  });
  it("isValidPhone matches the same rule", () => {
    expect(isValidPhone("+91 98123 45678")).toBe(true);
    expect(isValidPhone("12")).toBe(false);
  });
});
