// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import categorySlice from './categorySlice';
import CartSlice from './cartSlice';
import cartMiddleware from './cartMiddleware';

const loadCartState = () => {
  try {
    const serializedState = sessionStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn("Failed to load cart from sessionStorage", e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categorySlice.reducer,
    cart: CartSlice.reducer
  },
  preloadedState: {
    cart: loadCartState(),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
