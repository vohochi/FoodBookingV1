import {
  fetchData,
  deleteData,
  postData,
  updateData,
} from '@/_lib/data-services';
import { IPaymentMethod } from '@/types/PaymentMethod';

// Lấy danh sách payment method
export const getPaymentMethods = async (): Promise<IPaymentMethod[]> => {
  try {
    const response: IPaymentMethod[] = await fetchData(
      '/api/admin/payment-methods'
    );
    return response;
  } catch (error) {
    console.error('Error fetching payment methods:', error);
    throw new Error('Payment methods could not be loaded');
  }
};

// Lấy chi tiết payment method theo ID
export const getPaymentMethodById = async (
  id: string
): Promise<IPaymentMethod> => {
  try {
    const response: IPaymentMethod = await fetchData(
      `/api/admin/payment-methods/${id}`
    );
    return response;
  } catch (error) {
    console.error('Error fetching payment method details:', error);
    throw new Error('Payment method details could not be loaded');
  }
};

// Tạo payment method (đã có trong code của bạn)
export const createPaymentMethod = async (paymentMethod: IPaymentMethod) => {
  try {
    const formData = new FormData();

    formData.append('name', paymentMethod.name);
    formData.append('type', paymentMethod.type);
    formData.append('status', paymentMethod.status);

    if (paymentMethod.description)
      formData.append('description', paymentMethod.description);

    if (paymentMethod.img) {
      if (typeof paymentMethod.img === 'string') {
        formData.append('img', paymentMethod.img);
      } else if (paymentMethod.img instanceof File) {
        formData.append('img', paymentMethod.img);
      }
    }

    const response = await postData('/api/admin/payment-methods', formData);
    return response;
  } catch (error) {
    console.error('Error creating payment method:', error);
    throw new Error('Payment method could not be created');
  }
};

// Cập nhật payment method
export const updatePaymentMethod = async (
  id: string,
  paymentMethod: IPaymentMethod
) => {
  try {
    const formData = new FormData();

    // Chỉ append các trường được truyền vào
    if (paymentMethod.name) formData.append('name', paymentMethod.name);
    if (paymentMethod.type) formData.append('type', paymentMethod.type);
    if (paymentMethod.status) formData.append('status', paymentMethod.status);
    if (paymentMethod.description)
      formData.append('description', paymentMethod.description);

    // Xử lý hình ảnh
    if (paymentMethod.img) {
      if (typeof paymentMethod.img === 'string') {
        formData.append('img', paymentMethod.img);
      } else if (paymentMethod.img instanceof File) {
        formData.append('img', paymentMethod.img);
      }
    }

    const response = await updateData(
      `/api/admin/payment-methods/${id}`,
      formData
    );
    return response;
  } catch (error) {
    console.error('Error updating payment method:', error);
    throw new Error('Payment method could not be updated');
  }
};

// Xóa payment method
export const deletePaymentMethod = async (id: string): Promise<void> => {
  try {
    await deleteData(`/api/admin/payment-methods/${id}`);
  } catch (error) {
    console.error('Error deleting payment method:', error);
    throw new Error('Payment method could not be deleted');
  }
};
