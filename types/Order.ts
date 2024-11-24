export interface Order {
  order_id: string;
  user_id: string;
  voucher_id: string;
  app_trans_id: string;
  total: number;
  status: string;
  payment_method: string;
  payment_status: string;
  ship:number;
  shipping_address: {
    receiver: string;
    phone: string;
    address: string;
  };
  orderDetail: {
    menu_id: string;
    quantity: number;
    price: number;
    variant_size: string;
    rating: number;
    comment: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
