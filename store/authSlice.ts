// 'use client';
// store/authSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { register as registerApi, login as loginApi } from '@/_lib/auth';

// export const register = createAsyncThunk(
//   'auth/register',
//   async (
//     userData: { full_name: string; email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await registerApi(userData);
//       return response; // Giả sử bạn nhận được dữ liệu người dùng từ server
//     } catch (error) {
//       return rejectWithValue(error.message); // Trả về lỗi nếu có
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (
//     credentials: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await loginApi(credentials);
//       return response; // Giả sử bạn nhận được dữ liệu người dùng từ server
//     } catch (error) {
//       return rejectWithValue(error.message); // Trả về lỗi nếu có
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     isAuthenticated: false,
//     user: null,
//     status: 'idle', // idle | loading | succeeded | failed
//     error: null,
//   },
//   reducers: {
//     logout(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.isAuthenticated = true; // Nếu cần, bạn có thể tự động đăng nhập sau khi đăng ký
//         state.user = action.payload.user; // Lưu thông tin người dùng
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload; // Lưu thông tin lỗi
//       })
//       .addCase(login.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.isAuthenticated = true;
//         state.user = action.payload.user; // Lưu thông tin người dùng
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.payload; // Lưu thông tin lỗi
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
