import { createSlice } from "@reduxjs/toolkit";

// Load from localStorage
const loadFromLocalStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  items: loadFromLocalStorage("cart", []),
};

const MAX_QUANTITY = 5;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    addToCart: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);

      if (exists) {
        if (exists.quantity < MAX_QUANTITY) {
          exists.quantity += 1;
        }else{
          action.meta = {exceeded : true}
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", "[]");
    },
  },
});

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
