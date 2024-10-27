export interface Menu {
  _id: string;
  menu_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  created_at: Date;
  updated_at: Date;
}
