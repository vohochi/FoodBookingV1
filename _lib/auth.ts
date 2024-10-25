import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { postData } from './data-services';
// import { signIn } from 'next-auth/react';
const API_URL = '/api/auth'; // Địa chỉ API của bạn

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
