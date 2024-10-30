import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { postData } from './data-services';
import { IUser } from '@/types/User';
// import { signIn } from 'next-auth/react';
const API_URL = '/api/auth'; // Địa chỉ API của bạn

export const register = async (userData: IUser) => {
  return await postData(`${API_URL}/register`, userData);
};

export const login = async (credentials: IUser) => {
  return await postData(`${API_URL}/login`, credentials);
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

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
