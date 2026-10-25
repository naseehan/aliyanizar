import { describe, it, expect } from "vitest";
import { toSlug, fromSlug } from "./slug";

describe("toSlug", () => {
  it("lowercases and joins words with hyphens", () => {
    expect(toSlug("Orange Tree")).toBe("orange-tree");
  });

  it("collapses repeated whitespace and trims the ends", () => {
    expect(toSlug("  Desert   Rose  ")).toBe("desert-rose");
  });

  it("keeps digits", () => {
    expect(toSlug("Conform 1")).toBe("conform-1");
  });

  it("returns an empty string for missing names", () => {
    expect(toSlug(undefined)).toBe("");
    expect(toSlug(null)).toBe("");
  });
});

describe("fromSlug", () => {
  it("turns hyphens back into spaces", () => {
    expect(fromSlug("orange-tree")).toBe("orange tree");
  });

  it("still understands legacy URL-encoded slugs", () => {
    expect(fromSlug("Orange%20Tree")).toBe("orange tree");
  });

  it("returns an empty string for a missing slug", () => {
    expect(fromSlug(undefined)).toBe("");
  });

  it("round-trips with toSlug", () => {
    const names = ["orange tree", "conform 2", "bismillah"];
    for (const name of names) {
      expect(fromSlug(toSlug(name))).toBe(name);
    }
  });
});
