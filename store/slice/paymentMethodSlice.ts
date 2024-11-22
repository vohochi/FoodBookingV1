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
  async (params: { page: number; limit: number }) => {
    const response = await getPaymentMethods(params.page, params.limit);
    return response; // Return the response to be handled in the fulfilled action
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
// Add payment method
export const addPaymentMethod = createAsyncThunk<
  IPaymentMethod,
  IPaymentMethod
>(
  'paymentMethod/addPaymentMethod',
  async (paymentMethod, { rejectWithValue }) => {
    try {
      // Ensure the response is an IPaymentMethod object
      const response = await createPaymentMethod(paymentMethod);
      console.log('Response from API:', response); // Check if the response is as expected
      if (!response) {
        throw new Error('Invalid response from API');
      }
      return response;
    } catch (error) {
      console.error('Error in addPaymentMethod:', error);
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
    // Reducers for clearing errors and the current payment method
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPaymentMethod: (state) => {
      state.currentPaymentMethod = null;
    },
  },
  extraReducers: (builder) => {
    // Handling fetch payment methods
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPaymentMethods.fulfilled,
        (
          state,
          action: PayloadAction<{ total: number; data: IPaymentMethod[] }>
        ) => {
          state.loading = false;
          state.paymentMethods = action.payload.data; // Use `paymentMethods` as per the state definition
          state.totalPages = Math.ceil(action.payload.total / 10); // Assuming limit of 10 per page
          state.currentPage = action.payload.total / 10;
        }
      )
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch payment methods';
      })

      // Handling fetch payment method by ID
      .addCase(fetchPaymentMethodById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethodById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPaymentMethod = action.payload;
      })
      .addCase(fetchPaymentMethodById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handling add payment method
      .addCase(addPaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
    builder
      .addCase(addPaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods.push(action.payload); // Thêm phương thức thanh toán mới
      })
      .addCase(addPaymentMethod.rejected, (state, action) => {
        state.loading = false;
        console.error('Rejected with error:', action.payload); // Log the rejection reason
        state.error = action.payload as string;
      })

      // Handling update payment method
      .addCase(updatePaymentMethodAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaymentMethodAction.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.paymentMethods.findIndex(
          (pm) => pm._id === action.payload._id
        );
        if (index !== -1) {
          state.paymentMethods[index] = action.payload;
        }
        state.currentPaymentMethod = action.payload;
      })
      .addCase(updatePaymentMethodAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        console.error('Rejected with error:', action.payload); // Log the rejection reason
      })

      // Handling remove payment method
      .addCase(removePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePaymentMethod.fulfilled, (state, action) => {
        state.loading = false;

        // Thêm kiểm tra trước khi gọi filter
        if (Array.isArray(state.paymentMethods)) {
          state.paymentMethods = state.paymentMethods.filter(
            (pm) => pm._id !== action.payload
          );
        } else {
          console.error(
            'paymentMethods is not an array:',
            state.paymentMethods
          );
        }
      })
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
