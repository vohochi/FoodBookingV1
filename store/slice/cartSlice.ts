import { createSlice } from '@reduxjs/toolkit';
import { Menu } from '@/types/Menu';

export interface CartItem extends Menu {
  quantity: number;
  selectedSize: string;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  } as CartState, // Type assertion for initial state
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (i) => i._id === action.payload._id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
          selectedSize: action.payload.selectedSize,
        });
      }

      // Update total quantity and price efficiently
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (i) => i._id === action.payload.id
      );
      if (itemIndex !== -1) {
        const removedItem = state.items[itemIndex];
        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.price * removedItem.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) {
        item.quantity++;
        state.totalQuantity++;
        state.totalPrice += item.price;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--;
        state.totalPrice -= item.price;
      }
    },
    updateSize: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) {
        item.selectedSize = action.payload.size; // Cập nhật kích cỡ
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    updateCart: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  updateSize,
  updateCart,
} = CartSlice.actions;

export default CartSlice;
