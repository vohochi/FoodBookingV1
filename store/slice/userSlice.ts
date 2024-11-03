import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser } from '@/types/User';
import { getAllUsers, createUser, updateUser, deleteUser } from '@/_lib/user';

export interface UserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Async thunks for handling side effects
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params: { page: number; limit: number }) => {
    const response = await getAllUsers(params.page, params.limit);
    return response.users; // Assuming response contains an array of users
  }
);

export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: IUser) => {
    const newUser = await createUser(user);
    return newUser;
  }
);

export const editUser = createAsyncThunk(
  'users/editUser',
  async ({ id, updates }: { id: string; updates: Partial<IUser> }) => {
    const updatedUser = await updateUser(id, updates);
    return updatedUser;
  }
);

export const removeUser = createAsyncThunk(
  'users/removeUser',
  async (id: string) => {
    await deleteUser(id);
    return id; // Returning the ID to remove from state
  }
);

// Create the user slice
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload); // Add the new user to the list
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload; // Update the user in the list
        }
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload); // Remove the user
      });
  },
});

// Export the actions
export const { clearError } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
