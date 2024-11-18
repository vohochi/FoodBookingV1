// import { IPagination } from "./Pagination";

export interface Voucher {
  _id?: string; 
  discount_percent: number;
  start: Date;
  end: Date;
  code: string;
  name: string;
  limit: number;
  min_price?: number; 
  img?: string | File; 
  createdAt?: Date | string;
  updatedAt?: Date | string;
  // pagination?: IPagination
}
