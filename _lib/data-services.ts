import axios from 'axios';

const BASE_URL = 'http://localhost:3002';

/**
 * Hàm gọi API với các phương thức tùy chỉnh
 * @param endpoint - Đường dẫn API
 * @param method - Phương thức HTTP (GET, POST, PUT, DELETE)
 * @param data - Dữ liệu gửi đi (nếu cần, cho POST và PUT)
 * @returns Dữ liệu trả về từ API
 */
export const dataServices = async (
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  data?: any
) => {
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

    return response.data;
  } catch (error) {
    console.error(
      'Error fetching data:',
      error.response?.data || error.message
    );
    throw new Error('Data could not be loaded');
  }
};

// Export các phương thức cho dễ sử dụng
export const fetchData = (endpoint: string) => dataServices(endpoint, 'GET');
export const postData = (endpoint: string, data: any) =>
  dataServices(endpoint, 'POST', data);
export const updateData = (endpoint: string, data: any) =>
  dataServices(endpoint, 'PUT', data);
export const deleteData = (endpoint: string) =>
  dataServices(endpoint, 'DELETE');
