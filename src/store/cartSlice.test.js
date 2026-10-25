import { describe, it, expect, vi } from "vitest";
import reducer, {
  addToCart,
  removeFromCart,
  clearCart,
  setCart,
} from "./cartSlice";
import { makeStore } from "../test/utils";

const painting = { id: 1, name: "orange tree" };
const print = { id: 2, name: "desert rose" };

const stateWith = (items) => ({ items });

describe("cartSlice reducer", () => {
  it("adds a new item with quantity 1", () => {
    const state = reducer(stateWith([]), addToCart(painting));

    expect(state.items).toEqual([{ ...painting, quantity: 1 }]);
  });

  it("increments quantity when the same item is added again", () => {
    let state = reducer(stateWith([]), addToCart(painting));
    state = reducer(state, addToCart(painting));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it("never lets quantity go above 5", () => {
    let state = stateWith([]);
    for (let i = 0; i < 8; i++) state = reducer(state, addToCart(painting));

    expect(state.items[0].quantity).toBe(5);
  });

  it("flags the action when the limit is exceeded", () => {
    const store = makeStore({ cart: stateWith([{ ...painting, quantity: 5 }]) });

    const result = store.dispatch(addToCart(painting));

    expect(result.meta).toEqual({ exceeded: true });
  });

  it("does not flag the action below the limit", () => {
    const store = makeStore({ cart: stateWith([{ ...painting, quantity: 4 }]) });

    const result = store.dispatch(addToCart(painting));

    expect(result.meta).toBeUndefined();
    expect(store.getState().cart.items[0].quantity).toBe(5);
  });

  it("removes an item by id and leaves the rest", () => {
    const state = reducer(
      stateWith([
        { ...painting, quantity: 1 },
        { ...print, quantity: 2 },
      ]),
      removeFromCart(1)
    );

    expect(state.items).toEqual([{ ...print, quantity: 2 }]);
  });

  it("clears the cart", () => {
    const state = reducer(stateWith([{ ...painting, quantity: 3 }]), clearCart());

    expect(state.items).toEqual([]);
    expect(localStorage.getItem("cart")).toBe("[]");
  });

  it("replaces the cart with setCart", () => {
    const items = [{ ...print, quantity: 4 }];
    const state = reducer(stateWith([]), setCart(items));

    expect(state.items).toEqual(items);
  });

  it("persists every change to localStorage", () => {
    reducer(stateWith([]), addToCart(painting));

    expect(JSON.parse(localStorage.getItem("cart"))).toEqual([
      { ...painting, quantity: 1 },
    ]);
  });
});

describe("cartSlice initial state", () => {
  it("restores the cart saved in localStorage", async () => {
    localStorage.setItem("cart", JSON.stringify([{ ...painting, quantity: 2 }]));
    vi.resetModules();

    const { default: freshReducer } = await import("./cartSlice");

    expect(freshReducer(undefined, { type: "@@init" }).items).toEqual([
      { ...painting, quantity: 2 },
    ]);
  });

  it("falls back to an empty cart when localStorage is corrupted", async () => {
    localStorage.setItem("cart", "{not json");
    vi.resetModules();

    const { default: freshReducer } = await import("./cartSlice");

    expect(freshReducer(undefined, { type: "@@init" }).items).toEqual([]);
  });
});
