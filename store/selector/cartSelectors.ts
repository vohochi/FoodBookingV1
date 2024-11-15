import { CartItem, CartState } from '@/types/Cart';
import { RootState } from '../index';

// Select entire cart state
export const selectCart = (state: RootState): CartState => state.cart;

// Select all items in cart
export const selectCartItems = (state: RootState): CartItem[] =>
  state.cart.items;

// Select total quantity
export const selectCartTotalQuantity = (state: RootState): number =>
  state.cart.totalQuantity;

// Select total price
export const selectCartTotalPrice = (state: RootState): number =>
  state.cart.totalPrice;

// Select item by id
export const selectCartItemById =
  (id: string) =>
  (state: RootState): CartItem | undefined =>
    state.cart.items.find((item) => item._id === id);

// Select item quantity by id
export const selectCartItemQuantityById =
  (id: string) =>
  (state: RootState): number =>
    state.cart.items.find((item) => item._id === id)?.quantity ?? 0;

// Select if cart is empty
export const selectIsCartEmpty = (state: RootState): boolean =>
  state.cart && state.cart.items ? state.cart.items.length === 0 : true;

// Select number of unique items in cart
export const selectUniqueItemCount = (state: RootState): number =>
  state.cart && state.cart.items ? state.cart.items.length : 0;


// Select cart summary
export const selectCartSummary = (state: RootState) => ({
  items: state.cart.items,
  totalQuantity: state.cart.totalQuantity,
  totalPrice: state.cart.totalPrice,
  uniqueItems: state.cart.items.length,
});
