import { IPagination } from '@/types/Pagination';

export interface IPaymentMethod {
  _id: string; // Corresponds to the `_id` field in MongoDB
  name: string; // Name of the payment method
  type: string; // Type of the payment method
  description?: string; // Optional description
  status: string; // Optional status
  img?: string | File; // Optional image URL
  createdAt: string; // Timestamp for creation
  updatedAt: string; // Timestamp for last update
  pagination?: IPagination;
}
