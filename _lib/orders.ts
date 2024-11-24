
import { Address } from '@/types/User';
import { postData } from './data-services';
import { CartState } from '@/types/Cart';

export const createOrder = async (orderData: {
    cart: CartState,
    customAddress: Address,
    paymentType: string
}) => {
    try {
        const order = {
            orderItems: orderData.cart.map(item => ({
                menu_id: item.menu_id,
                quantity: item.quantity,
                variant_size: item.variant_size || null
            })),
            shipping_address: {
                receiver: orderData.customAddress.receiver,
                phone: orderData.customAddress.phone,
                address: orderData.customAddress.address
            },
            payment_method: orderData.paymentType,
            payment_method_id: orderData.paymentType === 'COD'
                ? getCODPaymentMethodId()
                : getZaloPayMethodId(),
        };

        const response = await postData('/api/users/order', order);
        return response;
    } catch (error) {
        console.error('Order creation error:', error);
        throw error;
    }
};

// Mock payment method IDs - replace with actual implementation
const getCODPaymentMethodId = () => 'cod_payment_method';
const getZaloPayMethodId = () => 'zalopay_payment_method';