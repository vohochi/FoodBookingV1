import { createSlice } from '@reduxjs/toolkit';
import { Menu } from '@/types/Menu';

export interface CartItem extends Menu {
  quantity: number;
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
      const existingItem = state.items.find((i) => i._id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity by 1
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1, // Add new item with quantity 1
        });
      }
      state.totalQuantity += 1; // Increase total quantity by 1
      state.totalPrice += action.payload.price; // Add the price of the item
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
  updateCart,
} = CartSlice.actions;

export default CartSlice;
