export interface Voucher {
  voucher_id: number;
  discount_percent: number;
  start: Date;
  end: Date;
  code: string;
  name: string;
  limit: number;
  min_price: number;
  created_at: Date;
  updated_at: Date;
}
