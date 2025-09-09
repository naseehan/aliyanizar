// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import favesReducer from "./favesSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    faves: favesReducer,
  },
});
