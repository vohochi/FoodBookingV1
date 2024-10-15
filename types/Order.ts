export interface Order {
  order_id: number;
  user_id: number;
  total_price: number;
  status: string;
  payment_method: string;
  created_at: Date;
  updated_at: Date;
}
