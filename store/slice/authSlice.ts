import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationCode,
} from '@/_lib/auth';
import { IUser } from '@/types/User';

// Interface for Auth State
export interface AuthState {
  user: object | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Initial Auth State
const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

// Async Thunk for User Registration
export const registerUserSlice = createAsyncThunk(
  'auth/registerUser',
  async (userData: IUser) => {
    const response = await register(userData); // Await the response
    console.log(response);
    return response; // Return the response
  }
);

// Async Thunk for User Login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: IUser) => {
    const response = await login(userData);
    return response;
  }
);

// Async Thunk for Forgot Password
export const forgotPasswordUser = createAsyncThunk(
  'auth/forgotPasswordUser',
  async (data: IUser) => {
    const response = await forgotPassword(data);
    return response;
  }
);
export const resendOTPUser = createAsyncThunk(
  'auth/forgotPasswordUser',
  async (data: IUser) => {
    const response = await resendVerificationCode(data);
    return response;
  }
);

// Async Thunk for Reset Password
export const resetPasswordUser = createAsyncThunk(
  'auth/resetPasswordUser',
  async (data: { token: string; newPassword: string }) => {
    const response = await resetPassword(data);
    return response;
  }
);
// verify email
export const verifyEmailUser = createAsyncThunk(
  'auth/verifyEmailUser',
  async (data: { email: string; code: string }) => {
    const response = await verifyEmail(data);
    return response;
  }
);

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      // Register User
      .addCase(registerUserSlice.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUserSlice.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUserSlice.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Forgot Password
      .addCase(forgotPasswordUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Reset Password
      .addCase(resetPasswordUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      // Logout
      .addCase(logout, (state) => {
        state.user = null;
        state.status = 'idle';
        state.error = null;
      }) // Verify Email
      .addCase(verifyEmailUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(verifyEmailUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = { ...state.user, isVerified: true }; // Đánh dấu user đã xác thực
      })
      .addCase(verifyEmailUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

// Export the logout action creator
export const { logout } = authSlice.actions;

// Export the auth reducer
export default authSlice;
