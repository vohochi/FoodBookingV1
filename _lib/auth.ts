import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { postData } from './data-services';
import { IUser } from '@/types/User';
import FacebookProvider from '@auth/core/providers/facebook';
// import { signIn } from 'next-auth/react';
const API_URL = '/api/auth'; // Địa chỉ API của bạn
import Cookies from 'js-cookie';

export const register = async (userData: IUser) => {
  return await postData(`${API_URL}/register`, userData);
};

export const login = async (credentials: IUser) => {
  try {
    const res = await postData(`${API_URL}/login`, credentials);
    // Khi set cookie
    Cookies.set('access_token1', JSON.stringify(res as string), {
      expires: 7,
      path: '/',
    });
    return res;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // or handle it as needed
  }
};
export const logout = async () => {
  const res = await postData(`${API_URL}/logout`);
  Cookies.remove('access_token1', { path: '/' });
  return res;
};

export const forgotPassword = async (data: IUser) => {
  return await postData(`${API_URL}/forgot-password`, data);
};

export const resetPassword = async (data: {
  token: string;
  newPassword: string;
}) => {
  return await postData(`${API_URL}/reset-password`, data);
};

export const verifyEmail = async (data: { email: string; code: string }) => {
  return await postData(`${API_URL}/verify-email`, data);
};
export const resendVerificationCode = async (data: IUser) => {
  return await postData(`${API_URL}/resend-verification-code`, data);
};

export const changePass = async (data: IUser) => {
  try {
    const response = await postData(`${API_URL}/change-password`, data);
    return response;
  } catch (error) {
    const apiError = error as { response?: { data?: { message?: string } } };
    if (apiError.response?.data?.message) {
      throw new Error(apiError.response.data.message);
    }
    throw new Error('Đã xảy ra lỗi. Vui lòng thử lại');
  }
};

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn() {
      try {
        // Gọi API để đăng nhập social
        await login({
          email: 'chivo241023icloud@gmail.com',
          password: 'vohochi',
        });
        // Lưu token vào cookie nếu đăng nhập thành công

        return true; // Cho phép đăng nhập
      } catch (error) {
        console.error('Đăng nhập thất bại:', error);
        throw new Error(
          'Đăng nhập thất bại. Vui lòng kiểm tra thông tin tài khoản hoặc liên hệ quản trị viên.'
        );
      }
    },
  },

  pages: {
    signIn: '/auth/login', // Trang đăng nhập của bạn
    signOut: '/',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
