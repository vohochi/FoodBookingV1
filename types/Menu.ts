export interface Variant {
  size: string;
  price: number;
}

export interface Menu {
  _id?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  img: string | File | null;
  quantity: number;
  variant?: string | Variant[];
  createdAt?: string;
  updateAt?: string;
  category: string;
}
