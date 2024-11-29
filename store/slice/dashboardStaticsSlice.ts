import { getDashboardStatistics } from '@/_lib/DashboardStatistics';
import {
  CurrentMonthStats,
  // DashboardData,
  IOrderStatus,
  PaymentStatus,
  YearlyStats,
} from '@/types/Statistics';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa interface cho state
interface DashboardState {
  orderStatus: IOrderStatus;
  paymentStatus: PaymentStatus;
  currentMonth: CurrentMonthStats;
  yearlyStats: YearlyStats[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'; // Enum loading state
  error: string | null;
  lastUpdated: number | null;
}

// Initial state với type safety
const initialState: DashboardState = {
  orderStatus: {
    processing: { count: 0, totalAmount: 0 },
    success: { count: 0, totalAmount: 0 },
    cancelled: { count: 0, totalAmount: 0 },
    pending: { count: 0, totalAmount: 0 },
  },
  paymentStatus: {
    success: { count: 0, totalAmount: 0 },
    failed: { count: 0, totalAmount: 0 },
    pending: { count: 0, totalAmount: 0 },
  },
  currentMonth: {
    _id: null,
    totalOrders: 0,
    totalAmount: 0,
    averageOrderValue: 0,
    successfulOrders: 0,
    canceledOrders: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  },
  yearlyStats: [
    {
      month: 0,
      totalOrders: 0,
      totalAmount: 0,
      averageOrderValue: 0,
    },
  ],
  loading: 'idle',
  error: null,
  lastUpdated: null,
};

// Async thunk với better error handling
export const fetchDashboardStatistics = createAsyncThunk(
  'dashboard/fetchStatistics',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getDashboardStatistics();
      console.log(data);
      return data;
    } catch (error) {
      console.error('Error fetching dashboard statistics:', error);
      return rejectWithValue({
        message:
          error instanceof Error
            ? error.message
            : 'Could not fetch dashboard statistics',
        code: 'FETCH_ERROR',
      });
    }
  }
);

// Slice với thêm một số action handlers
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Reset state về initial
    resetDashboard: () => {
      return initialState;
    },
    // Clear error
    clearError: (state) => {
      state.error = null;
    },
    // Update một phần của dashboard data
    updatePartialData: (
      state,
      action: PayloadAction<Partial<DashboardState>>
    ) => {
      // Update state with partial data
      state.orderStatus = {
        ...state.orderStatus,
        ...action.payload.orderStatus,
      };
      state.paymentStatus = {
        ...state.paymentStatus,
        ...action.payload.paymentStatus,
      };
      state.currentMonth = {
        ...state.currentMonth,
        ...action.payload.currentMonth,
      };
      state.yearlyStats = action.payload.yearlyStats ?? state.yearlyStats;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatistics.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(fetchDashboardStatistics.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // Ensure that the data is properly structured
        state.currentMonth = action.payload.currentMonth;
        state.orderStatus = action.payload.orderStatus;
        state.yearlyStats = action.payload.yearlyStats;
        state.paymentStatus = action.payload.paymentStatus;
        state.lastUpdated = Date.now();
        state.error = null;
      })
      .addCase(fetchDashboardStatistics.rejected, (state) => {
        state.loading = 'failed';
        // state.error = action.payload?.message || 'An unknown error occurred';
      });
  },
});

// Export actions
export const { resetDashboard, clearError, updatePartialData } =
  dashboardSlice.actions;

// Export selector helpers
export const selectDashboardData = (state: { dashboard: DashboardState }) =>
  state.dashboard;

export const selectDashboardLoading = (state: { dashboard: DashboardState }) =>
  state.dashboard.loading;

export const selectDashboardError = (state: { dashboard: DashboardState }) =>
  state.dashboard.error;

export const selectLastUpdated = (state: { dashboard: DashboardState }) =>
  state.dashboard.lastUpdated;

export default dashboardSlice.reducer;
