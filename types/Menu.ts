export interface Menu {
  _id: string;
  menu_id: number;
  name: string;
  description: string;
  price: number;
  variant: Variant[];
  image: string;
  created_at: Date;
  updated_at: Date;
}
interface Variant {
  size: string;
  price: number; 
}
export interface MenusParams {
  page: number;
  limit: number;
  categoryId: string;
  minPrice: string | number;
  maxPrice: string | number;
}