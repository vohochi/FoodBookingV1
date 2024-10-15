import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { postData } from './data-services';
const API_URL = '/api/auth'; // Địa chỉ API của bạn

// lib/auth.ts

export const register = async (userData: {
  full_name: string;
  email: string;
  password: string;
}) => {
  return await postData(`${API_URL}/register`, userData);
};

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return await postData(`${API_URL}/login`, credentials);
};

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
