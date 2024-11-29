import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
} from '@/_lib/paymentMethod';
import { IPaymentMethod } from '@/types/PaymentMethod';

// Define the initial state structure
export interface PaymentMethodState {
  paymentMethods: IPaymentMethod[];
  currentPaymentMethod: IPaymentMethod | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

// Initial state
const initialState: PaymentMethodState = {
  paymentMethods: [],
  currentPaymentMethod: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

// Fetch payment methods
export const fetchPaymentMethods = createAsyncThunk(
  'paymentMethods/fetchPaymentMethods',
  async (
    {
      page = 1,
      limit = 10,
      search = '',
    }: { page: number; limit: number; search?: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await getPaymentMethods(page, limit, search);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to fetch payment methods');
    }
  }
);

// Fetch payment method by ID
export const fetchPaymentMethodById = createAsyncThunk(
  'paymentMethod/fetchPaymentMethodById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getPaymentMethodById(id);
      return response;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Failed to fetch payment method details');
    }
  }
);

// Add payment method
export const addPaymentMethod = createAsyncThunk(
  'paymentMethod/addPaymentMethod',
  async (paymentMethod: IPaymentMethod, { rejectWithValue }) => {
    try {
      const response = await createPaymentMethod(paymentMethod);
      return response;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Failed to create payment method');
    }
  }
);

// Update payment method
export const updatePaymentMethodAction = createAsyncThunk(
  'paymentMethod/updatePaymentMethod',
  async (
    { _id, paymentMethod }: { _id: string; paymentMethod: IPaymentMethod },
    { rejectWithValue }
  ) => {
    try {
      const response = await updatePaymentMethod(_id, paymentMethod);
      return response;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Failed to update payment method');
    }
  }
);

// Remove payment method
export const removePaymentMethod = createAsyncThunk(
  'paymentMethod/removePaymentMethod',
  async (id: string, { rejectWithValue }) => {
    try {
      await deletePaymentMethod(id);
      return id;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Failed to delete payment method');
    }
  }
);

// Create slice
const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPaymentMethod: (state) => {
      state.currentPaymentMethod = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch payment methods
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload.paymentMethods;
        state.totalPages = action.payload.pagination.totalPages;
        state.currentPage = action.payload.pagination.currentPage;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch payment method by ID
      .addCase(fetchPaymentMethodById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPaymentMethodById.fulfilled,
        (state, action: PayloadAction<IPaymentMethod>) => {
          state.loading = false;
          state.currentPaymentMethod = action.payload;
        }
      )
      .addCase(fetchPaymentMethodById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Add payment method
      .addCase(addPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addPaymentMethod.fulfilled,
        (state, action: PayloadAction<IPaymentMethod>) => {
          state.loading = false;
          state.paymentMethods.push(action.payload);
        }
      )
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update payment method
      .addCase(updatePaymentMethodAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updatePaymentMethodAction.fulfilled,
        (state, action: PayloadAction<IPaymentMethod>) => {
          state.loading = false;
          const index = state.paymentMethods.findIndex(
            (pm) => pm._id === action.payload._id
          );
          if (index !== -1) {
            state.paymentMethods[index] = action.payload;
          }
          state.currentPaymentMethod = action.payload;
        }
      )
      .addCase(updatePaymentMethodAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Remove payment method
      .addCase(removePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removePaymentMethod.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.paymentMethods = state.paymentMethods.filter(
            (pm) => pm._id !== action.payload
          );
        }
      )
      .addCase(removePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearError, clearCurrentPaymentMethod } =
  paymentMethodSlice.actions;
export default paymentMethodSlice.reducer;
