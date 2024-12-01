// import { IPagination } from "./Pagination";

export interface Voucher {
  _id: string;
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
  img?: string | File;
}
export interface FetchVouchersResponse {
  orderTotal: number;
  success: boolean;
  message: string;
  data: {
    discountAmount: number;
    finalAmount: number;
    discountPercent: number;
    vouchers?: Voucher[];
  };
  _id?: string;
  discount_percent?: number;
  start?: Date;
  end?: Date;
  code?: string;
  name?: string;
  limit?: number;
  min_price?: number;
  img?: string | File;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  // pagination?: IPagination
}
