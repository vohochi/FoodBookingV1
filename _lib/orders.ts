import { fetchData, postData, updateData } from '@/_lib/data-services';
import { Order } from '@/types/Order';

interface OrderFilters {
  status?: string;
  startDate?: string;
  endDate?: string;
}

// Fetch all orders with pagination and optional filters
export const getOrders = async (
  page: number,
  limit: number,
  filters: OrderFilters = {}
): Promise<Order[]> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    }).toString();

    const response = await fetchData<{ orders: Order[] }>(
      `/api/admin/orders?${queryParams}`
    );
    console.log(response);
    return response.orders;
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
    return response;
  } catch (error) {
    console.error(`Error updating order status for id ${orderId}:`, error);
    throw new Error('Could not update order status');
  }
};
