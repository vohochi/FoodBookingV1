import { Address } from '@/types/User';
import { fetchData, postData } from './data-services';
import { CartState } from '@/types/Cart';
import { Order } from '@/types/Order';

export const createOrder = async (orderData: {
    orderItems: CartState['items'],
    shipping_address: Address,
    payment_method_id: string,
    code?: string,
}) => {
    try {
        const response = await postData('/api/orders', orderData);
        console.log('od', orderData);
        console.log('res', response);

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
