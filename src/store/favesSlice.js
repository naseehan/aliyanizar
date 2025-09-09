// store/favesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
};

const initialState = {
  items: loadFromLocalStorage("faves", []),
};

const favesSlice = createSlice({
  name: "faves",
  initialState,
  reducers: {
    toggleFave: (state, action) => {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem("faves", JSON.stringify(state.items));
    },
    removeFave: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem("faves", JSON.stringify(state.items));
    },
  },
});

export const { toggleFave, removeFave } = favesSlice.actions;
export default favesSlice.reducer;
