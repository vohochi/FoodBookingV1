import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@/types/User';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/_lib/user';
import { IPagination } from '@/types/Pagination';

// Define the actual API response type

// Define our internal state response type

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

// Fetch users with pagination
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: { page: number; limit: number; search?: string }) => {
    const response = await getAllUsers(
      params.page,
      params.limit,
      params.search
    );
    return response; // Return response matching GetUsersResponse type
  }
);

// Add new user
export const addUser = createAsyncThunk<IUser, IUser>(
  'users/addUser',
  async (user) => {
    const newUser = await createUser(user);
    return newUser;
  }
);

// Edit existing user
export const editUser = createAsyncThunk<
  IUser,
  { _id: string; updates: Partial<IUser> }
>('users/editUser', async ({ _id, updates }) => {
  const updatedUser = await updateUser(_id, updates);
  return updatedUser;
});

// Remove user
export const removeUser = createAsyncThunk<string, string>(
  'users/removeUser',
  async (id) => {
    await deleteUser(id);
    return id;
  }
);

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
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export const { clearError, setPage } = userSlice.actions;
export default userSlice.reducer;
