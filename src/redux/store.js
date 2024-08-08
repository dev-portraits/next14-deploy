import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/redux/features/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default store;
