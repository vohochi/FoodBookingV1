import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '@/types/Cart';
const isSessionStorageAvailable = () => typeof window !== 'undefined' && 'sessionStorage' in window;

const saveCartToSession = (cartState: CartState) => {
  sessionStorage.setItem('cart', JSON.stringify(cartState));
};

const getCartFromSession = (): CartState => {
  if (!isSessionStorageAvailable()) {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
  const cart = sessionStorage.getItem('cart');
  try {
    return cart ? JSON.parse(cart) : { items: [], totalQuantity: 0, totalPrice: 0 };
  } catch {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
};


const CartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromSession(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((i) => i._id === action.payload._id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity,
          selectedSize: action.payload.selectedSize,
          price: action.payload.price,
        });
      }

      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price! * item.quantity, 0);

      saveCartToSession(state);
    },

    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i._id === action.payload.id);
      if (itemIndex !== -1) {
        const removedItem = state.items[itemIndex];
        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.price! * removedItem.quantity;
        state.items.splice(itemIndex, 1);

        saveCartToSession(state);
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) {
        item.quantity++;
        state.totalQuantity++;
        state.totalPrice += item.price!;

        saveCartToSession(state);
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
        state.totalQuantity--;
        state.totalPrice -= item.price!;

        saveCartToSession(state);
      }
    },

    updateSize: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item) {
        item.selectedSize = action.payload.size;

        if (item.variant && item.variant.length > 0) {
          const selectedVariant = item.variant.find((v) => v.size === action.payload.size);
          item.price = selectedVariant ? selectedVariant.price : item.price;
        }
        state.totalPrice = state.items.reduce((acc, item) => acc + item.price! * item.quantity, 0)
        saveCartToSession(state);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      sessionStorage.removeItem('cart');
    },

    updateCart: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;

      saveCartToSession(state);
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
