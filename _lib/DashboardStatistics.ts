import { fetchData } from '@/_lib/data-services';
import { DashboardData, IDashboardData } from '@/types/Statistics';

// Fetch dashboard statistics
export const getDashboardStatistics = async (): Promise<DashboardData> => {
  try {
    const response = await fetchData<DashboardData>('/api/admin/statistics');
    console.log(response);

    // Ensure to return the correct value from response, such as response.data if the data is nested
    return response; // If the response itself is the DashboardData, return it directly
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    throw new Error('Could not fetch dashboard statistics');
  }
};

export const getOrderStatisticsByDateRange = async (
  startDate: string,
  endDate: string
): Promise<IDashboardData> => {
  try {
    const response = await fetchData<{
      success: boolean;
      data: IDashboardData;
    }>(`/api/admin/statistics/range?startDate=${startDate}&endDate=${endDate}`);

    if (!response.success) {
      throw new Error('Failed to fetch dashboard statistics');
    }

    console.log('Dashboard statistics fetched successfully:', response.data);

    // Return the data processed from the response
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    throw new Error('Could not fetch dashboard statistics');
  }
};
