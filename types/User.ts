export interface IUser {
  _id?: string;
  id?: number;
  fullname?: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  role?: 'customer' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
  is_locked?: boolean;
  avatar?: string;
}
