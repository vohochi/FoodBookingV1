// store/index.ts
import { configureStore, Middleware } from '@reduxjs/toolkit';
// import authReducer from './authSlice';
import CartSlice from './slice/cartSlice';
import cartMiddleware from './middleware/cartMiddleware';
import menusSlice from './slice/menusSlice';
import authSlice from '@/store/slice/authSlice';
import filterReducer from '@/store/slice/filterSlice';
import profileSlice from '@/store/slice/profileSlice';
import paymentMethodSlice from './slice/paymentMethodSlice';
import paymentMethodSliceUser from './slice/paymentMethodSliceUser';
import orderReducer from './slice/orderSlice';
import userSlice from './slice/userSlice';
import { categoriesReducer } from '@/store/slice/categorySlice';
import voucherSlice from '@/store/slice/voucherSlice';
import orderSlice from './slice/orderSlice';
import orderAdmin from './slice/orderSliceAdmin';
import dashboardSlice from './slice/dashboardStaticsSlice';

const loadCartState = () => {
  try {
    const serializedState = sessionStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (e) {
    console.warn('Failed to load cart from sessionStorage', e);
    return undefined;
  }
};

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    cart: CartSlice.reducer,
    menus: menusSlice,
    auth: authSlice.reducer,
    filter: filterReducer,
    profile: profileSlice.reducer,
    paymentMethod: paymentMethodSliceUser.reducer,
    orders: orderReducer,
    user: userSlice,
    voucher: voucherSlice,
    order: orderSlice,
    orderAdmin: orderAdmin,
    payment: paymentMethodSlice,
    dashboardStatics: dashboardSlice,
  },
  preloadedState: {
    cart: loadCartState(),
  },
  middleware: (getDefaultMiddleware) => {
    // Use the `concat` method to add your custom middleware
    return getDefaultMiddleware({
      thunk: true, // Enable thunk middleware
    }).concat(cartMiddleware as Middleware);
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
