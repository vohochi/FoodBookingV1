export interface Variant {
  size: string;
  price: number;
}

export interface Menu {
  _id: string;
  menu_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  variant: string | Variant[];
  created_at: Date;
  updated_at: Date;
}
