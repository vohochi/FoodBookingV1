export interface IOrder {
  user: string; // ID của người dùng
  total_price: number;
  status: 'Pending' | 'Processing' | 'Completed' | 'Canceled';
  payment_method: 'Cash' | 'Credit Card' | 'E-Wallet';
  shipping_address: string;
  createdAt?: Date;
  updatedAt?: Date;
}
