import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  isLoaded: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    loadCartFromLocalStorage: (state) => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        state.items = JSON.parse(storedCart);
      }
      state.isLoaded = true;
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    }
  },
});

export const { addToCart, loadCartFromLocalStorage, updateCartItemQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
