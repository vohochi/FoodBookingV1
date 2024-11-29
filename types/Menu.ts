export interface Menu {
  _id?: string;
  name: string;
  description: string;
  price: number;
  img: string | File | null;
  quantity: number;
  variant?: Variant[];
  createdAt?: string;
  updateAt?: string;
  category: Category | string;
}
interface Category {
  _id: string;
  name: string;
}
export interface Variant {
  size: string;
  price: number;
}
export interface MenusParams {
  name?: string;
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
export interface GetMenusResponse {
  menuItems: Menu[];
  totalPages: number;
}
export interface Quantity {
  _id: string;
  totalMenuItems: number;
}
