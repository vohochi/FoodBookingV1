export interface Review {
  review_id: number;
  user_id: number;
  order_id: number;
  rating: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
}
