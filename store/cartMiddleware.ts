import { isAction, Middleware } from 'redux';
import { Menu } from '@/types/Menu'; // Assuming Menu interface is defined in '@/types/Menu.ts'

export interface CartItem extends Menu {
  price:number | string | undefined;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const saveCartToSessionStorage = (cart: CartState) => {
  try {
    const serializedState = JSON.stringify(cart);
    sessionStorage.setItem('cart', serializedState);
  } catch (error) {
    console.warn('Failed to save cart to sessionStorage', error);
  }
};

const cartMiddleware: Middleware<object, CartState> =
  (store) => (next) => (action) => {
    // console.log('Dispatching action:', action.type);

    if (isAction(action)) {
      const result = next(action);

      if (action.type.startsWith('Cart/')) {
        const state = store.getState() as CartState;
        saveCartToSessionStorage(state);
      }

      return result;
    }

    return next(action); // Handle non-action values
  };
export default cartMiddleware;
