import { Menu } from '@/types/Menu';

export interface CartItem extends Menu {
    quantity: number;
    selectedSize: string;
}

export interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}