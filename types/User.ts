import { IPagination } from './Pagination';

export interface GetUsersResponse {
  users: IUser[];
  pagination: IPagination;
}
export interface IUser {
  _id?: string;
  id?: number;
  fullname?: string;
  email?: string;
  password?: string;
  address?: Address;
  role?: 'user' | 'admin';
  updatedAt?: Date;
  is_locked?: boolean;
  avatar?: string | File;
  newPassword?: string;
}

export interface Address {
  receiver?: string;
  phone?: string;
  address?: string;
  _id?: string;
  avatar?: string;
  isVerified?: boolean; // Thêm trường isVerified
  verificationCode?: number; // Thêm trường verificationCode
  verificationCodeExpires?: Date; // Thêm trường verificationCodeExpires
  resetPasswordToken?: string; // Thêm trường resetPasswordToken
  resetPasswordExpires?: Date; // Thêm trường resetPasswordExpires
  pagination?: IPagination;
}
