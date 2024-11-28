import {
  fetchData,
  deleteData,
  postData,
  updateData,
} from '@/_lib/data-services';
import { IPaymentMethod } from '@/types/PaymentMethod';

export const getPaymentMethods = async (
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<{
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
    // Build query parameters dynamically
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    // Add the 'search' parameter if provided
    if (search) {
      queryParams.append('search', search);
    }

    // Fetch data with the constructed query parameters
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
    }>(`/api/payment_methods?${queryParams}`);
    console.log(response);
    if (!response.success) {
      throw new Error('Failed to fetch payment methods');
    }

    return response;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw new Error('Data could not be loaded');
  }
};

// Lấy chi tiết payment method theo ID
export const getPaymentMethodById = async (
  id: string
): Promise<IPaymentMethod> => {
  try {
    const response: IPaymentMethod = await fetchData(
      `/api/payment_methods/${id}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching payment method details:', error);
    throw new Error('Payment method details could not be loaded');
  }
};

export const createPaymentMethod = async (paymentMethod: IPaymentMethod) => {
  try {
    const formData = new FormData();

    // Append data to FormData
    formData.append('name', paymentMethod.name);
    formData.append('type', paymentMethod.type);
    formData.append('status', paymentMethod.status);
    if (paymentMethod.description) {
      formData.append('description', paymentMethod.description);
    }

    if (paymentMethod.img) {
      if (typeof paymentMethod.img === 'string') {
        formData.append('img', paymentMethod.img);
      } else if (paymentMethod.img instanceof File) {
        formData.append('img', paymentMethod.img);
      }
    }

    // Send the FormData to the backend
    const response = await postData('/api/admin/payment_methods', formData);

    // Type assertion with runtime validation
    const responseData = response as unknown;

    // Validate the response matches IPaymentMethod interface
    if (
      typeof responseData === 'object' &&
      responseData !== null &&
      '_id' in responseData &&
      'name' in responseData &&
      'type' in responseData &&
      'status' in responseData
    ) {
      return responseData as IPaymentMethod;
    }

    throw new Error('Invalid response format from server');
  } catch (error) {
    console.error('Error creating payment method:', error);
    throw new Error('Payment method could not be created');
  }
};
// Cập nhật payment method
export const updatePaymentMethod = async (
  _id: string,
  paymentMethod: IPaymentMethod
) => {
  try {
    const formData = new FormData();

    // Append only the fields that are present in the paymentMethod object
    if (paymentMethod.name) formData.append('name', paymentMethod.name);
    if (paymentMethod.type) formData.append('type', paymentMethod.type);
    if (paymentMethod.status) formData.append('status', paymentMethod.status);
    if (paymentMethod.description)
      formData.append('description', paymentMethod.description);

    // Handle image data (if present)
    if (paymentMethod.img) {
      if (typeof paymentMethod.img === 'string') {
        formData.append('img', paymentMethod.img);
      } else if (paymentMethod.img instanceof File) {
        formData.append('img', paymentMethod.img);
      }
    }

    // Send the FormData to the backend for update
    const response = await updateData(
      `/api/admin/payment_methods/${_id}`,
      formData
    );

    // Type assertion with runtime validation
    const responseData = response as unknown;

    // Validate the response matches IPaymentMethod interface
    if (
      typeof responseData === 'object' &&
      responseData !== null &&
      '_id' in responseData &&
      'name' in responseData &&
      'type' in responseData &&
      'status' in responseData
    ) {
      return responseData as IPaymentMethod;
    }

    throw new Error('Invalid response format from server');
  } catch (error) {
    console.error('Error updating payment method:', error);
    throw new Error('Payment method could not be updated');
  }
};

// Xóa payment method
export const deletePaymentMethod = async (id: string): Promise<void> => {
  try {
    await deleteData(`/api/admin/payment_methods/${id}`);
  } catch (error) {
    console.error('Error deleting payment method:', error);
    throw new Error('Payment method could not be deleted');
  }
};
