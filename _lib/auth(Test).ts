// lib/auth.ts
import { postData } from './data-services';

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
