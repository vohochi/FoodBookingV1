import { fetchData } from '@/_lib/data-services';
import { DashboardData } from '@/types/Statistics';

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
