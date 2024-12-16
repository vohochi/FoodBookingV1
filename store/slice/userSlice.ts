import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@/types/User';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/_lib/user';
import { IPagination } from '@/types/Pagination';

export interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
  pagination: IPagination;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalUsers: 0,
    hasMore: true,
  },
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: { page: number; limit: number; search?: string }) => {
    const response = await getAllUsers(
      params.page,
      params.limit,
      params.search
    );
    return response;
  }
);

export const addUser = createAsyncThunk<IUser, IUser, { rejectValue: string }>(
  'users/addUser',
  async (user, { rejectWithValue }) => {
    try {
      const newUser = await createUser(user);
      return newUser;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const editUser = createAsyncThunk<
  IUser,
  { _id: string; updates: Partial<IUser> },
  { rejectValue: string }
>('users/editUser', async ({ _id, updates }, { rejectWithValue }) => {
  try {
    const updatedUser = await updateUser(_id, updates);
    return updatedUser;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const removeUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('users/removeUser', async (id, { rejectWithValue }) => {
  try {
    await deleteUser(id);
    return id;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action: { payload: number }) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add user';
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to edit user';
      })
      .addCase(removeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload);
        state.error = null;
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove user';
      });
  },
});

export const { clearError, setPage } = userSlice.actions;
export default userSlice.reducer;
