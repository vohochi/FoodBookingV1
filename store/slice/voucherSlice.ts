import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Voucher } from '@/types/Voucher';
import {
  getAllVouchers,
  createVoucher,
  updateVoucher,
  deleteVoucher,
} from '@/_lib/voucher';

interface IPagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface VoucherState {
  vouchers: Voucher[];
  loading: boolean;
  error: string | null;
  pagination: IPagination;
}

const initialState: VoucherState = {
  vouchers: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
};

interface FetchVouchersParams {
  page: number;
  limit: number;
  name?: string;
}

// Updated fetchVouchers to handle the new response structure
export const fetchVouchers = createAsyncThunk(
  'vouchers/fetchVouchers',
  async (params: FetchVouchersParams) => {
    // Truyền thêm tham số name vào hàm getAllVouchers nếu có
    const response = await getAllVouchers(
      params.page,
      params.limit,
      params.name
    );
    console.log(response);

    return {
      vouchers: response.vouchers,
      pagination: {
        currentPage: params.page,
        totalPages: Math.ceil(response.total / params.limit),
        totalItems: response.total,
        itemsPerPage: params.limit,
      },
    };
  }
);

// Create a voucher
export const createVoucherAsync = createAsyncThunk(
  'vouchers/createVoucher',
  async (voucher: Voucher) => {
    const response = await createVoucher(voucher);
    return response;
  }
);

// Update a voucher
export const updateVoucherAsync = createAsyncThunk(
  'vouchers/updateVoucher',
  async (updateData: { _id: string; voucher: Voucher }) => {
    const response = await updateVoucher(updateData._id, updateData.voucher);
    return response;
  }
);
export const deleteVoucherAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('vouchers/deleteVoucher', async (_id, { rejectWithValue }) => {
  try {
    await deleteVoucher(_id);
    return _id;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

// Rest of the slice remains the same
const voucherSlice = createSlice({
  name: 'vouchers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchVouchers.fulfilled,
        (
          state,
          action: PayloadAction<{
            vouchers: Voucher[];
            pagination: IPagination;
          }>
        ) => {
          state.loading = false;
          state.vouchers = action.payload.vouchers;
          state.pagination = action.payload.pagination;
        }
      )
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch vouchers';
      })

      // Create Voucher
      .addCase(createVoucherAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVoucherAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Sử dụng type assertion qua 'unknown'
        const newVoucher = action.payload as unknown as Voucher;
        state.vouchers.push(newVoucher);
      })
      .addCase(createVoucherAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create voucher';
      })

      // Update Voucher
      .addCase(updateVoucherAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateVoucherAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Sử dụng type assertion qua 'unknown'
        const updatedVoucher = action.payload as unknown as Voucher;
        const index = state.vouchers.findIndex(
          (voucher) => voucher._id === updatedVoucher._id
        );
        if (index !== -1) {
          state.vouchers[index] = updatedVoucher;
        }
      })
      .addCase(updateVoucherAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update voucher';
      })

      // Delete Voucher
      .addCase(deleteVoucherAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVoucherAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Remove the deleted voucher from the state
        state.vouchers = state.vouchers.filter(
          (voucher) => voucher._id !== action.payload
        );
      })
      .addCase(deleteVoucherAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete voucher';
      });
  },
});

export default voucherSlice.reducer;
