export interface IUser {
  _id?: string;
  id?: number;
  fullname?: string;
  email?: string;
  password?: string;
  address?: Address;
  role?: 'user' | 'admin';
  createdAt?: Date;
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
}
