import { createSlice } from '@reduxjs/toolkit';

interface OrderState {
  currentOrder: any;
  orders: any[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  currentOrder: null,
  orders: [],
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
      state.orders.push(action.payload);
    },
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  }
});

export const { 
  createOrderStart, 
  createOrderSuccess, 
  createOrderFailure,
  clearCurrentOrder 
} = orderSlice.actions;

export default orderSlice.reducer;