import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getPaymentMethodById,
} from '@/_lib/paymentMethod';
import { IPaymentMethod } from '@/types/PaymentMethod';

// Định nghĩa trạng thái ban đầu
interface PaymentMethodState {
  paymentMethods: IPaymentMethod[];
  currentPaymentMethod: IPaymentMethod | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

// Trạng thái khởi tạo
const initialState: PaymentMethodState = {
  paymentMethods: [],
  currentPaymentMethod: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1,
};

// Lấy danh sách payment methods
export const fetchPaymentMethods = createAsyncThunk(
  'paymentMethod/fetchPaymentMethods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getPaymentMethods();
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to fetch payment methods');
    }
  }
);

// Lấy chi tiết payment method
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

// Tạo mới payment method
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

// Cập nhật payment method
export const updatePaymentMethodAction = createAsyncThunk(
  'paymentMethod/updatePaymentMethod',
  async (
    { id, paymentMethod }: { id: string; paymentMethod: IPaymentMethod },
    { rejectWithValue }
  ) => {
    try {
      const response = await updatePaymentMethod(id, paymentMethod);
      return response;
    } catch (error) {
      console.log(error);

      return rejectWithValue('Failed to update payment method');
    }
  }
);

// Xóa payment method
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

// Tạo slice
const paymentMethodSlice = createSlice({
  name: 'paymentMethod',
  initialState,
  reducers: {
    // Các reducer đồng bộ nếu cần
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentPaymentMethod: (state) => {
      state.currentPaymentMethod = null;
    },
  },
  extraReducers: (builder) => {
    // Xử lý các trạng thái cho fetch payment methods
    builder
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý chi tiết payment method
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

      // Xử lý thêm mới payment method
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

      // Xử lý cập nhật payment method
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

      // Xử lý xóa payment method
      .addCase(removePaymentMethod.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removePaymentMethod.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = state.paymentMethods.filter(
          (pm) => pm._id !== action.payload
        );
      })
      .addCase(removePaymentMethod.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Xuất actions và reducer
export const { clearError, clearCurrentPaymentMethod } =
  paymentMethodSlice.actions;

export default paymentMethodSlice.reducer;
