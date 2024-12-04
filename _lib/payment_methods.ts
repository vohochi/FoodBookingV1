import { fetchData } from '@/_lib/data-services';
import { IPaymentMethod } from '@/types/PaymentMethod';

export const fetchPaymentMethods = async (): Promise<{
  success: boolean;
  data: {
    paymentMethods: IPaymentMethod[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
  };
}> => {
  try {
    const response = await fetchData<{
      success: boolean;
      data: {
        paymentMethods: IPaymentMethod[];
        pagination: {
          currentPage: number;
          totalPages: number;
          totalItems: number;
          itemsPerPage: number;
        };
      };
    }>(`/api/payment_methods`);
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching payment_methods:', error);
    throw new Error('Data could not be loaded');
  }
};
