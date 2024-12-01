import { fetchData } from '@/_lib/data-services';
import { Order } from '@/types/Order';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrderStatus,
  OrderFilters,
} from '@/_lib/orders';


interface OrderState {
  orders: Order[];
  loading: boolean;
  order: Order | null;
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
      const data = await getOrders(page, limit, filters || {});
      return data; // Return both orders and pagination
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
        state.orders = action.payload.orders;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.totalPages = action.payload.totalPages - 1;
        state.totalOrders = action.payload.totalOrders;
        state.currentPage = action.payload.currentPage - 1;
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
