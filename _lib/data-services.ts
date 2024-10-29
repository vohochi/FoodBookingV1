import axios from 'axios';

const BASE_URL = 'http://localhost:3002';

/**
 * Hàm gọi API với các phương thức tùy chỉnh
 * @param endpoint - Đường dẫn API
 * @param method - Phương thức HTTP (GET, POST, PUT, DELETE)
 * @param data - Dữ liệu gửi đi (nếu cần, cho POST và PUT)
 * @returns Dữ liệu trả về từ API
 */ export const dataServices = async <T, R>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: T
): Promise<R> => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      withCredentials: true,
    };

    const response = await axios(config);

    if (!response.data) {
      throw new Error('No data returned from API');
    }

    return response.data as R;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error fetching data:', error.response.data);
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error
    ) {
      console.error('Error fetching data:', error.message);
    } else {
      console.error('Error fetching data:', error);
    }
    throw new Error('Data could not be loaded');
  }
};

// Export các phương thức cho dễ sử dụng
export const fetchData = <T>(endpoint: string): Promise<T> =>
  dataServices<void, T>(endpoint, 'GET');
export const postData = <T>(endpoint: string, data: T) =>
  dataServices<T, T>(endpoint, 'POST', data);
export const updateData = <T>(endpoint: string, data: T) =>
  dataServices<T, T>(endpoint, 'PUT', data);
export const deleteData = (endpoint: string) =>
  dataServices<void, void>(endpoint, 'DELETE');
