export interface Invoice {
  invoice_id: number;
  order_id: number;
  payment_method: string;
  payment_status: string;
  due_date: Date;
  created_at: Date;
}
