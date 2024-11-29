import axios from 'axios';
// const BASE_URL = 'http://localhost:3002';
const BASE_URL = process.env.NEXT_PUBLIC_DOMAIN_BACKEND
/**
 * Hàm gọi API với các phương thức tùy chỉnh
 * @param endpoint - Đường dẫn API
 * @param method - Phương thức HTTP (GET, POST, PUT, DELETE)
 * @param data - Dữ liệu gửi đi (nếu cần, cho POST và PUT)
 * @param cookies - Cookie để gửi đi (nếu có)
 * @returns Dữ liệu trả về từ API
 */
export const dataServices = async <T, R>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  data?: T,
  cookies?: string // Thêm tham số cookies
): Promise<R> => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers: {
        Cookie: cookies, // Đính kèm cookie nếu có
      },
      withCredentials: true, // Đảm bảo gửi cookie qua các yêu cầu cross-origin
    };

    const response = await axios(config);

    if (!response.data) {
      throw new Error('No data returned from API');
    }

    return response.data as R;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('Error fetching data:', error.response.data);
      // Return the error data from the API response
      return error.response.data as R;
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'message' in error
    ) {
      console.error('Error fetching data:', error.message);
      // Return a generic error object
      return { message: error.message } as R;
    } else {
      console.error('Error fetching data:', error);
      // Return a generic error object
      return { message: 'An unknown error occurred' } as R;
    }
  }
};

// Export các phương thức cho dễ sử dụng
export const fetchData = <T>(endpoint: string, cookies?: string): Promise<T> =>
  dataServices<void, T>(endpoint, 'GET', undefined, cookies);

export const postData = <T>(endpoint: string, data?: T, cookies?: string) =>
  dataServices<T, T>(endpoint, 'POST', data, cookies);

export const updateData = <T>(endpoint: string, data: T, cookies?: string) =>
  dataServices<T, T>(endpoint, 'PATCH', data, cookies);

export const deleteData = (endpoint: string, cookies?: string) =>
  dataServices<void, void>(endpoint, 'DELETE', undefined, cookies);
