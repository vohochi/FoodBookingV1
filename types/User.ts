export interface IUser {
  _id?: string;
  id?: number;
  full_name?: string;
  email: string;
  password?: string;
  phone_number?: string;
  address?: string;
  role?: 'customer' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}
