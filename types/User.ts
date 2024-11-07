export interface IUser {
  _id?: string;
  id?: number;
  fullname?: string;
  email: string;
  password?: string;
  phone_number?: string;
  address?: string[]; // Corrected: Array[] to string[]
  role?: 'customer' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
  is_locked?: boolean;
  avatar?: string;
}
