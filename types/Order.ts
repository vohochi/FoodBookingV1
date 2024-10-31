export interface Order {
  order_id: string;
  user_id: string;
  total: number;
  status: string;
  payment_method: string;
  payment_status: string;
  shipping_address: string;
  orderDetail: {
    menu_id: string;
    quantity: number;
    price: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
