import { describe, it, expect, vi } from "vitest";
import reducer, { toggleFave, removeFave } from "./favesSlice";

const painting = { id: 1, name: "orange tree" };
const print = { id: 2, name: "desert rose" };

describe("favesSlice reducer", () => {
  it("adds an item that is not a favourite yet", () => {
    const state = reducer({ items: [] }, toggleFave(painting));

    expect(state.items).toEqual([painting]);
  });

  it("removes an item that is already a favourite", () => {
    const state = reducer({ items: [painting, print] }, toggleFave(painting));

    expect(state.items).toEqual([print]);
  });

  it("removeFave removes by id", () => {
    const state = reducer({ items: [painting, print] }, removeFave(2));

    expect(state.items).toEqual([painting]);
  });

  it("removeFave with an unknown id changes nothing", () => {
    const state = reducer({ items: [painting] }, removeFave(99));

    expect(state.items).toEqual([painting]);
  });

  it("persists favourites to localStorage", () => {
    reducer({ items: [] }, toggleFave(print));

    expect(JSON.parse(localStorage.getItem("faves"))).toEqual([print]);
  });

  it("restores favourites saved in localStorage", async () => {
    localStorage.setItem("faves", JSON.stringify([painting]));
    vi.resetModules();

    const { default: freshReducer } = await import("./favesSlice");

    expect(freshReducer(undefined, { type: "@@init" }).items).toEqual([painting]);
  });
});
