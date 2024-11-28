// store/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  OrderFilters,
} from '@/_lib/orders';
import { Order } from '@/types/Order';

interface OrderState {
  orders: Order[]; // List of orders
  order: Order | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalOrders: number;
  totalPages: number;
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

// Async thunk to fetch orders with pagination and filters
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (
    {
      page,
      limit,
      filters,
    }: { page: number; limit: number; filters?: OrderFilters },
    { rejectWithValue }
  ) => {
    try {
      const { orders, pagination } = await getOrders(
        page,
        limit,
        filters || {}
      );
      return { orders, pagination }; // Return both orders and pagination
    } catch {
      return rejectWithValue('Could not fetch orders');
    }
  }
);

// Async thunk to fetch a specific order by ID
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId: string, { rejectWithValue }) => {
    try {
      return await getOrderById(orderId);
    } catch {
      return rejectWithValue(`Could not fetch order with id ${orderId}`);
    }
  }
);

// Async thunk to create a new order
export const createOrderThunk = createAsyncThunk(
  'orders/createOrder',
  async (orderData: Order, { rejectWithValue }) => {
    try {
      return await createOrder(orderData);
    } catch {
      return rejectWithValue('Could not create order');
    }
  }
);

// Async thunk to update order status
export const updateOrderStatusThunk = createAsyncThunk(
  'orders/updateOrderStatus',
  async (
    {
      orderId,
      status,
      payment_status,
    }: { orderId: string; status: string; payment_status: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await updateOrderStatus(orderId, status, payment_status);
      return res;
    } catch {
      return rejectWithValue(`Could not update order status for id ${orderId}`);
    }
  }
);

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
        if (action.payload?.pagination) {
          state.orders = action.payload.orders;
          state.totalPages = action.payload.pagination.totalPages;
          state.totalOrders = action.payload.pagination.totalOrders;
          state.currentPage = action.payload.pagination.currentPage;
        } else {
          // Nếu không có pagination, có thể xử lý trường hợp này, ví dụ:
          state.orders = action.payload.orders;
          state.totalPages = 1; // Mặc định
          state.totalOrders = action.payload.orders.length; // Sử dụng số lượng orders hiện tại
          state.currentPage = 1; // Mặc định
        }
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderById.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.order = action.payload;
        }
      )
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatusThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order.order_id === action.payload.order_id
        );
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
