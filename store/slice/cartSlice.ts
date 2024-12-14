import { createSlice } from '@reduxjs/toolkit';
import { CartState } from '@/types/Cart';
const isSessionStorageAvailable = () => typeof window !== 'undefined' && 'sessionStorage' in window;

const saveCartToSession = (cartState: CartState) => {
  sessionStorage.setItem('cart', JSON.stringify(cartState));
};

const getCartFromSession = (): CartState => {
  if (!isSessionStorageAvailable()) {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
  const cart = sessionStorage.getItem('cart');
  try {
    return cart ? JSON.parse(cart) : { items: [], totalQuantity: 0, totalPrice: 0 };
  } catch {
    return { items: [], totalQuantity: 0, totalPrice: 0 };
  }
};


const CartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromSession(),
  reducers: {
    addToCart: (state, action) => {
      const { _id, quantity, selectedSize, variant, price } = action.payload;

      // Nếu sản phẩm có variant, kiểm tra dựa trên cả _id và selectedSize
      const existingItem = variant.length > 0
        ? state.items.find((i) => i._id === _id && i.selectedSize === selectedSize)
        : state.items.find((i) => i._id === _id);

      if (existingItem) {
        // Nếu sản phẩm đã tồn tại (dựa trên điều kiện trên), cộng dồn số lượng
        existingItem.quantity += quantity;
      } else {
        // Nếu không tồn tại, thêm mới sản phẩm
        state.items.push({
          ...action.payload,
          quantity,
          selectedSize,
          price,
        });
      }

      // Tính lại tổng số lượng và tổng giá
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price! * item.quantity, 0);

      saveCartToSession(state);
    },


    removeFromCart: (state, action) => {
      const itemIndex = state.items.findIndex((i) => i._id === action.payload.id);
      if (itemIndex !== -1) {
        const removedItem = state.items[itemIndex];
        state.totalQuantity -= removedItem.quantity;
        state.totalPrice -= removedItem.price! * removedItem.quantity;
        state.items.splice(itemIndex, 1);

        saveCartToSession(state);
      }
    },

    incrementQuantity: (state, action) => {
      const { id, size } = action.payload;

      const currentIndex = state.items.findIndex(
        (item) => item._id === id && item.selectedSize === size
      );

      if (currentIndex !== -1) {
        state.items[currentIndex].quantity += 1;
      }

      // Cập nhật tổng số lượng và giá
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price! * item.quantity, 0);
      saveCartToSession(state);
    },


    decrementQuantity: (state, action) => {
      const { id, size } = action.payload;

      const currentIndex = state.items.findIndex(
        (item) => item._id === id && item.selectedSize === size
      );

      if (currentIndex !== -1 && state.items[currentIndex].quantity > 1) {
        state.items[currentIndex].quantity -= 1;
      } else if (currentIndex !== -1) {
        state.items.splice(currentIndex, 1); // Xóa sản phẩm nếu số lượng là 1
      }

      // Cập nhật tổng số lượng và giá
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price! * item.quantity, 0);
      saveCartToSession(state);
    },


    updateSize: (state, action) => {
      const { id, size, previousSize } = action.payload;

      // Tìm sản phẩm cũ (dựa trên id và previousSize)
      const currentIndex = state.items.findIndex(
        (item) => item._id === id && item.selectedSize === previousSize
      );

      if (currentIndex === -1) return; // Không tìm thấy sản phẩm

      const itemToUpdate = state.items[currentIndex];

      // Tìm sản phẩm đã tồn tại với `id` và `size` mới
      const existingIndex = state.items.findIndex(
        (item) => item._id === id && item.selectedSize === size
      );

      if (existingIndex !== -1) {
        // Nếu sản phẩm với size mới đã tồn tại, hợp nhất
        state.items[existingIndex].quantity += itemToUpdate.quantity;
        state.items.splice(currentIndex, 1); // Xóa sản phẩm cũ
      } else {
        // Nếu không tồn tại, cập nhật size của sản phẩm
        state.items[currentIndex].selectedSize = size;

        // Cập nhật giá theo size mới (nếu có variant)
        const variant = itemToUpdate.variant?.find((v) => v.size === size);
        if (variant) {
          state.items[currentIndex].price = variant.price;
        }
      }

      // Cập nhật tổng số lượng và giá
      state.totalQuantity = state.items.reduce((acc, item) => acc + item.quantity, 0);
      state.totalPrice = state.items.reduce((acc, item) => acc + item.price! * item.quantity, 0);
      saveCartToSession(state);
    },



    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      sessionStorage.removeItem('cart');
    },

    updateCart: (state, action) => {
      state.items = action.payload.items;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalPrice = action.payload.totalPrice;

      saveCartToSession(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  updateSize,
  updateCart,
} = CartSlice.actions;

export default CartSlice;
