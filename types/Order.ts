import { Menu } from '@/types/Menu';
import { IPaymentMethod } from '@/types/PaymentMethod';

// Định nghĩa các trạng thái có thể có cho order
export type OrderStatus = 'pending' | 'processing' | 'success' | 'cancelled';

// Định nghĩa các trạng thái thanh toán có thể có
export type PaymentStatus = 'success' | 'pending' | 'failed';

export interface ShippingAddress {
  receiver: string;
  phone: string;
  address: string;
}

export interface OrderDetail {
  menu_id: Menu | string;
  quantity: number;
  price: number;
  variant_size?: string | null;
  rating?: number | null;
  comment?: string | null;
}

export interface Order {
  _id:string;
  order_id: string;
  orderDetail: OrderDetail[];
  user_id: string; // This can be a string or ObjectId if needed
  voucher_id?: Voucher | string | null;
  app_trans_id?: string | null;
  status: OrderStatus; // Sử dụng OrderStatus để xác định trạng thái của đơn hàng
  total: number;
  payment_method: IPaymentMethod | string;
  payment_status: PaymentStatus | string; // Sử dụng PaymentStatus để xác định trạng thái thanh toán
  ship: number;
  shipping_address: ShippingAddress;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  message?: string;
}
export interface IPaginationOrder {
  currentPage: number;
  totalOrders: number;
  totalPages: number;
}

export interface OrderResponse {
  orders: Order[];
  currentPage: number;
  totalOrders: number;
  totalPages: number;
}
export interface Voucher {
  discount_percent: number;
}
