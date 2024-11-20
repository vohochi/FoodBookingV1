// store/orderSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
} from '@/_lib/orders';
import { Order } from '@/types/Order';

// Define the initial state interface
interface OrderState {
  orders: Order[];
  order: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
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
    }: { page: number; limit: number; filters?: Record<string, string> },
    { rejectWithValue }
  ) => {
    try {
      return await getOrders(page, limit, filters);
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
      return await updateOrderStatus(orderId, status, payment_status);
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
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )
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
      .addCase(
        createOrderThunk.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          state.orders.push(action.payload);
        }
      )
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateOrderStatusThunk.fulfilled,
        (state, action: PayloadAction<Order>) => {
          state.loading = false;
          const index = state.orders.findIndex(
            (order) => order.order_id === action.payload.order_id
          );
          if (index !== -1) state.orders[index] = action.payload;
        }
      )
      .addCase(updateOrderStatusThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
