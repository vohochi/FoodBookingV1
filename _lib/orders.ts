import { Address } from '@/types/User';
import { fetchData, postData, updateData } from './data-services';
import { CartState } from '@/types/Cart';
import { Order } from '@/types/Order';


import { OrderResponse } from '@/types/Order';

export interface OrderFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
  search?: string; // Để khớp với API nếu cần tìm kiếm
}

export const getOrders = async (
  page: number,
  limit: number,
  filters: OrderFilters = {}
): Promise<OrderResponse> => {
  try {
    // Xử lý các tham số filter thành query string
    const queryParams: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };

    if (filters.status) queryParams.status = filters.status;
    if (filters.startDate) queryParams.startDate = filters.startDate;
    if (filters.endDate) queryParams.endDate = filters.endDate;
    if (filters.search) queryParams.search = filters.search;

    const queryString = new URLSearchParams(queryParams).toString();

    // Gọi API với query string đã xử lý
    const response = await fetchData<OrderResponse>(
      `/api/admin/orders?${queryString}`
    );

    console.log(response);
    return response; // Đảm bảo trả về đúng cấu trúc từ API
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Could not fetch orders');
  }
};
// Fetch a specific order by ID
export const getOrderById = async (orderId: string): Promise<Order> => {
  try {
    const order = await fetchData<Order>(`/api/admin/orders/${orderId}`);
    return order;
  } catch (error) {
    console.error(`Error fetching order with id ${orderId}:`, error);
    throw new Error('Could not fetch the order');
  }
};

// Create a new order
export const createOrder = async (orderData: Order): Promise<Order> => {
  try {
    const response = await postData<Order>('/api/admin/orders', orderData);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Could not create the order');
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string,
  status: string,
  payment_status: string
): Promise<Order> => {
  try {
    const response = await updateData(`/api/admin/orders/${orderId}/status`, {
      status,
      payment_status,
    });
    return response as Order;
  } catch (error) {
    console.error(`Error updating order status for id ${orderId}:`, error);
    throw new Error('Could not update order status');
  }
};

export const paymentOrderStatusZalopay = async (orderId: string) => {
  const response = await postData(`/api/zalopay/order-status/${orderId}`);
  return response;
};

//----
export const createOrderInfo = async (orderData: {
  orderItems: CartState['items'],
  shipping_address: Address,
  payment_method_id: string,
  code?: string,
  order_url:string,
}) => {
  try {
    const response = await postData('/api/orders', orderData);
    console.log('od', orderData);
    console.log('res', response);
    if (response.order_url){ 
      window.location.href = response.order_url;
    }
    return response;
  } catch (error) {
    console.error('Order creation error:', error);
    throw error;
  }
};

export const fetchOrder = async (): Promise<Order[]> => {
  try {
    const response: { order: Order[] } = await fetchData(
      '/api/orders'
    );
    return response.order;
  } catch (error) {
    console.error('Order fetch error:', error);
    throw error;
  }
}
