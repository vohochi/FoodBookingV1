export interface Menu {
  _id: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  variant: Variant[];
  img: string;
  created_at: Date;
  updated_at: Date;
}
interface Category {
  _id: string;
  name: string;
}
interface Variant {
  size: string;
  price: number;
}
export interface MenusParams {
  page: number;
  limit: number;
  category: string;
  minPrice: number;
  maxPrice: number;
}
export interface GetMenusResponse {
  menuItems: Menu[];
  totalPages: number;
}
export interface Quantity {
  _id: string;
  totalMenuItems: number;
}