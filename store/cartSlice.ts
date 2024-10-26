import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: 'Cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity; 
            } else {
                state.items.push({ ...action.payload, quantity: action.payload.quantity });
            }
            state.totalQuantity += action.payload.quantity; 
            state.totalPrice += action.payload.price * action.payload.quantity; 
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.items.findIndex((i) => i.id === action.payload.id);
            if (itemIndex !== -1) {
                const item = state.items[itemIndex];
                state.totalQuantity -= item.quantity; 
                state.totalPrice -= item.price * item.quantity; 
                state.items.splice(itemIndex, 1);
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity++;
                state.totalQuantity++;
                state.totalPrice += item.price;
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity--;
                state.totalQuantity--;
                state.totalPrice -= item.price;
            }
        },
        clearCart: (state) => {
            state.items = [];
            state.totalQuantity = 0;
            state.totalPrice = 0;
        },
        updateCart: (state, action) => {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
            state.totalPrice = action.payload.totalPrice;
        }
    },
});

export const { addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart, updateCart } = CartSlice.actions;
export default CartSlice;
