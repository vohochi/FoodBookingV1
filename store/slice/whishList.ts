import { createSlice } from '@reduxjs/toolkit';
import { Menu } from '@/types/Menu'; // Import kiểu Menu từ file types/Menu

// Kiểm tra xem sessionStorage có khả dụng không
const isSessionStorageAvailable = () =>
  typeof window !== 'undefined' && 'sessionStorage' in window;

// Lưu wishlist vào sessionStorage
const saveWishlistToSession = (wishlistState: WishlistState) => {
  sessionStorage.setItem('wishlist', JSON.stringify(wishlistState));
};

// Lấy wishlist từ sessionStorage
const getWishlistFromSession = (): WishlistState => {
  if (!isSessionStorageAvailable()) {
    return { items: [] }; // Nếu sessionStorage không khả dụng, trả về mảng items trống
  }
  const wishlist = sessionStorage.getItem('wishlist');
  try {
    return wishlist ? JSON.parse(wishlist) : { items: [] }; // Trả về wishlist từ sessionStorage
  } catch {
    return { items: [] }; // Nếu có lỗi khi phân tích dữ liệu, trả về mảng items trống
  }
};

// Định nghĩa WishlistState với kiểu dữ liệu Menu[]
interface WishlistState {
  items: Menu[];
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: getWishlistFromSession(),
  reducers: {
    // Thêm sản phẩm vào wishlist
    addToWishlist: (state, action) => {
      const existingItem = state.items.find(
        (i) => i._id === action.payload._id
      );

      if (!existingItem) {
        state.items.push({
          ...action.payload, // Thêm item mới vào wishlist
        });

        saveWishlistToSession(state); // Lưu wishlist vào sessionStorage
      }
    },

    // Xóa sản phẩm khỏi wishlist
    removeFromWishlist: (state, action) => {
      const itemIndex = state.items.findIndex(
        (i) => i._id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1); // Xóa sản phẩm khỏi wishlist
        saveWishlistToSession(state); // Lưu wishlist vào sessionStorage
      }
    },

    // Xóa toàn bộ wishlist
    clearWishlist: (state) => {
      state.items = []; // Xóa toàn bộ sản phẩm trong wishlist
      sessionStorage.removeItem('wishlist'); // Xóa dữ liệu wishlist khỏi sessionStorage
    },

    // Cập nhật wishlist
    updateWishlist: (state, action) => {
      state.items = action.payload.items; // Cập nhật lại danh sách sản phẩm
      saveWishlistToSession(state); // Lưu wishlist vào sessionStorage
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  updateWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
