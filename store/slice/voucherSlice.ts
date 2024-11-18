import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Voucher } from '@/types/Voucher';
import { getAllVouchers, createVoucher, updateVoucher, deleteVoucher } from '@/_lib/voucher';

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
}

// Updated fetchVouchers to handle the new response structure
export const fetchVouchers = createAsyncThunk(
  'vouchers/fetchVouchers',
  async (params: FetchVouchersParams) => {
    const response = await getAllVouchers(params.page, params.limit);
    console.log(response)
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
  async (updateData: { id: string; voucher: Voucher }) => {
    const response = await updateVoucher(updateData.id, updateData.voucher);
    return response;
  }
);

// Delete a voucher
export const deleteVoucherAsync = createAsyncThunk(
  'vouchers/deleteVoucher',
  async (id: string) => {
    await deleteVoucher(id);
    return id; // return the ID of the deleted voucher for removing it from the state
  }
);



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
      .addCase(fetchVouchers.fulfilled, (state, action: PayloadAction<{
        vouchers: Voucher[];
        pagination: IPagination;
      }>) => {
        state.loading = false;
        state.vouchers = action.payload.vouchers;
        state.pagination = action.payload.pagination;
      })
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
  state.vouchers.push(action.payload); // Add the newly created voucher to the state
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
  const index = state.vouchers.findIndex(voucher => voucher._id === action.payload._id);
  if (index !== -1) {
    state.vouchers[index] = action.payload; // Replace the updated voucher
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
  state.vouchers = state.vouchers.filter(voucher => voucher._id !== action.payload);
})
.addCase(deleteVoucherAsync.rejected, (state, action) => {
  state.loading = false;
  state.error = action.error.message || 'Failed to delete voucher';
});
  }
});

export default voucherSlice.reducer;