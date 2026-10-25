import { describe, it, expect } from "vitest";
import { store } from "./store";
import { addToCart, clearCart } from "./cartSlice";
import { toggleFave } from "./favesSlice";

describe("app store", () => {
  it("exposes cart and faves slices", () => {
    expect(store.getState()).toEqual({
      cart: { items: expect.any(Array) },
      faves: { items: expect.any(Array) },
    });
  });

  it("wires cart and faves reducers independently", () => {
    store.dispatch(clearCart());
    store.dispatch(addToCart({ id: 10, name: "test" }));
    store.dispatch(toggleFave({ id: 11, name: "fave" }));

    const { cart, faves } = store.getState();
    expect(cart.items).toEqual([{ id: 10, name: "test", quantity: 1 }]);
    expect(faves.items).toContainEqual({ id: 11, name: "fave" });
  });
});
