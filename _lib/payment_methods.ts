import {
    fetchData,
} from '@/_lib/data-services';

export const fetchPaymentMethods = async () => {
    try {
        const response = await fetchData(
            '/api/payment_methods'
        );
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error fetching payment_methods:', error);
        throw new Error('Data could not be loaded');
    }
};