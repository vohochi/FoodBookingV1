export interface Menu {
  _id?: string;
  name: string;
  description: string;
  price?: number;
  img: string | File | null;
  quantity: number;
  variant?: Variant[];
  createdAt?: string;
  updateAt?: string;
  category: Category | string;
  star:number | undefined;
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
  sort?: 'price_asc' | 'price_desc';
}
export interface GetMenusResponse {
  menuItems: Menu[];
  totalPages: number;
  totalMenuItems: number;
}
export interface Quantity {
  _id: string;
  totalMenuItems: number;
}
