import { fetchData, postData } from '@/_lib/data-services';
import { Order } from '@/types/Order';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchOrders } from './orderSliceAdmin';
import { Menu } from '@/types/Menu';

export interface OrderState {
  orders: Order[];
  loading: boolean;
  order: Order | null;
  error: string | null;
  currentPage: number;
  totalOrders: number;
  totalPages: number;
  reviews: {
    menu_id: null | string;
    menu_item: Menu[];
    current_page: number;
    total_pages: number;
  }
}
export interface MenuReviewsResponse {
  menu_id: string;
  current_page: number;
  total_pages: number;
  reviews: {
    menu_id: null | string;
    menu_item: Menu[];
    current_page: number;
    total_pages: number;
  };
}

interface OrderBonus {
  orders: Order[];
  order_id: string;
  message?: string;
  app_trans_id?: string | null;
}

export const initialState: OrderState = {
  orders: [],
  currentPage: 1,
  totalPages: 1,
  totalOrders: 0,
  order: null,
  loading: false,
  error: null,
  reviews: {
    menu_id: null,
    menu_item: [],
    current_page: 1,
    total_pages: 1
  }
};

export const fetchOrdersUser = createAsyncThunk(
  'orders/fetchOrders',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await fetchData(`/api/orders?page=${page}`) as OrderState;

      for (const order of response.orders) {
        if (typeof order.app_trans_id === 'string') {
          const status = await checkStatus(order.app_trans_id);
          console.log('Order status:', status);
        }
      }

      return response;
    } catch {
      return rejectWithValue('lỗi');
    }
  }
);


export const checkStatus = async (app_trans_id: string | null): Promise<OrderBonus> => {
  try {
    if (app_trans_id === null) {
      throw new Error('app_trans_id is null');
    }
    const payload = { app_trans_id };

    const response = await postData(`/api/zalopay/order-status/${app_trans_id}`, payload);

    return response as OrderBonus;
  } catch (error) {
    console.error('Error check payment statuss:', error);
    throw error;
  }
};


export const cancelOrdersUser = createAsyncThunk(
  'orders/cancelOrders',
  async (order_id: string, { rejectWithValue }) => {
    try {
      const response = await postData(`/api/orders/${order_id}/cancel`, { order_id });
      return response;
    } catch (error) {
      console.error('Order cancellation error:', error);
      return rejectWithValue('Lỗi hủy đơn hàng');
    }
  }
)

export const postReview = async (reviewData: {
  order_id: string;
  menu_id: string;
  rating: number;
  comment?: string;
  message?: string;
}) => {
  try {
    const response = await postData('/api/orders/review', reviewData);
    if (response?.message == 'Can only review success orders') {
      throw new Error('Không thể đánh giá đơn hàng chưa thanh toán hoặc đã hủy');
    } else if (response?.message == 'Item has already been reviewed') {
      throw new Error('Bạn đã đánh giá món này rồi');
    }
    return response;
  } catch (error) {
    console.error('Error post review:', error);
    throw error; 
  }
};


export const addReview = createAsyncThunk(
  'orders/addReview',
  async (
    reviewData: { order_id: string; menu_id: string; rating: number; comment?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await postReview(reviewData);
      return { ...reviewData, ...response };
    } catch (error) {
      if (error instanceof Error && error.message === 'Không thể đánh giá đơn hàng chưa thanh toán hoặc đã hủy') {
        return rejectWithValue(error.message);
      } else if (error instanceof Error && error.message === 'Bạn đã đánh giá món này rồi') {
        return rejectWithValue(error.message); 
      }
      return rejectWithValue(error || 'Lỗi không xác định');
    }
  }
);


// Async thunk để lấy đánh giá của menu
export const fetchMenuReviews = createAsyncThunk(
  'orders/fetchMenuReviews',
  async (
    { menu_id, page = 1 }: { menu_id: string; page?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchData<MenuReviewsResponse>(`/api/orders/reviews/menu/${menu_id}?page=${page}`);

      if (!response) {
        return rejectWithValue('Invalid response format');
      }

      return {
        reviews: response.reviews,
        current_page: response.current_page || page,
        total_pages: response.total_pages || 1,
        menu_id: menu_id
      };
    } catch (error) {
      console.error('Fetch menu reviews error:', error);
      return rejectWithValue(error || 'Không thể lấy đánh giá menu');
    }
  }
);



const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.totalPages = action.payload.totalPages;
        state.totalOrders = action.payload.totalOrders;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.totalPages = 0;
        state.totalOrders = 0;
        state.currentPage = 1;
      })
      .addCase(cancelOrdersUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrdersUser.fulfilled, (state, action) => {
        state.loading = false;
        const canceledOrderId = action.payload.order_id;

        state.orders = state.orders.map(order =>
          order._id === canceledOrderId
            ? { ...order, status: 'cancelled' }
            : order
        );
      })
      .addCase(cancelOrdersUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;

        const { order_id, menu_id, rating, comment } = action.payload;

        const orderIndex = state.orders.findIndex((order) => order._id === order_id);
        if (orderIndex !== -1) {
          const order = state.orders[orderIndex];

          const itemIndex = order.orderDetail.findIndex((item) => item.menu_id === menu_id);
          if (itemIndex !== -1) {
            order.orderDetail[itemIndex].rating = rating;
            order.orderDetail[itemIndex].comment = comment;
          }
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMenuReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuReviews.fulfilled, (state, action) => {
        state.loading = false;

        const reviews = Array.isArray(action.payload.reviews) ? action.payload.reviews : [];

        state.reviews = {
          menu_id: action.payload.menu_id,
          menu_item: reviews,
          current_page: action.payload.current_page,
          total_pages: action.payload.total_pages
        };
      })
      .addCase(fetchMenuReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;

        // Reset reviews state on error
        state.reviews = {
          menu_id: null,
          menu_item: [],
          current_page: 1,
          total_pages: 1
        };
      });
  },
});

export default orderSlice.reducer;
