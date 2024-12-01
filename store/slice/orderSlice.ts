import { fetchData, postData } from '@/_lib/data-services';
import { Order } from '@/types/Order';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders } from './orderSliceAdmin';

interface OrderState {
  orders: Order[];
  loading: boolean;
  order: Order | null;
  error: string | null;
  currentPage: number;
  totalOrders: number;
  totalPages: number;
}
interface OrderBonus {
  order_id: string;
  message?: string;
  app_trans_id?: string | undefined | null;
}

export const initialState: OrderState = {
  orders: [],
  currentPage: 1,
  totalPages: 1,
  totalOrders: 0,
  order: null,
  loading: false,
  error: null,
};

// Async thunk to fetch orders
export const fetchOrdersUser = createAsyncThunk(
  'orders/fetchOrders',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await fetchData(`/api/orders?page=${page}`);
      return response;
    } catch {
      return rejectWithValue('lỗi');
    }
  }
)

export const cancelOrdersUser = createAsyncThunk(
  'orders/cancelOrders',
  async (order_id: string, { rejectWithValue }) => {
    try {
      const response = await postData(`/api/orders/${order_id}/cancel`, { order_id });
      return response; // Assuming the backend returns the updated order
    } catch (error) {
      console.error('Order cancellation error:', error);
      return rejectWithValue('Lỗi hủy đơn hàng');
    }
  }
)


const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalPages = action.payload.totalPages;
        state.totalOrders = action.payload.totalOrders;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.totalPages = 0;
        state.totalOrders = 0;
        state.currentPage = 1;
      })
      // Cancel order
      .addCase(cancelOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        const canceledOrderId = action.payload.order_id;

        // Find and update the order's status instead of removing it
        state.orders = state.orders.map(order =>
          order._id === canceledOrderId
            ? { ...order, status: 'cancelled' }
            : order
        );
      })
      .addCase(cancelOrdersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default orderSlice.reducer;
