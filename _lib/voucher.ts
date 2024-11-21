import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from '@/_lib/data-services';
import { Voucher } from '@/types/Voucher';

/**
 * Get all vouchers with pagination.
 * @param page - Current page number.
 * @param limit - Number of vouchers per page.
 * @returns Promise<{ total: number; vouchers: Voucher[] }>
 */
// First, let's update the service to properly handle the API response structure
export const getAllVouchers = async (
  page: number = 1,
  limit: number = 10
): Promise<{ total: number; vouchers: Voucher[] }> => {
  try {
    const response = await fetchData<{
      success: boolean;
      data: {
        vouchers: Voucher[];
        pagination: {
          totalItems: number;
          currentPage: number;
          totalPages: number;
          itemsPerPage: number;
        };
      };
    }>(`/api/vouchers?page=${page}&limit=${limit}`);

    return {
      vouchers: response.data.vouchers,
      total: response.data.pagination.totalItems,
    };
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    throw new Error('Data could not be loaded');
  }
};

export const createVoucher = async (voucher: Voucher) => {
  try {
    // Create FormData
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append('name', voucher.name);
    formData.append('code', voucher.code);
    formData.append('discount_percent', voucher.discount_percent.toString()); // Convert number to string
    formData.append('start', voucher.start.toISOString()); // Convert Date to ISO string
    formData.append('end', voucher.end.toISOString()); // Convert Date to ISO string
    formData.append('limit', voucher.limit.toString()); // Convert number to string

    // Optionally handle min_price
    if (voucher.min_price !== undefined) {
      formData.append('min_price', voucher.min_price.toString());
    }

    // Handle img (either a string URL or a File)
    if (voucher.img) {
      if (typeof voucher.img === 'string') {
        // If it's a URL or string path, append as string
        formData.append('img', voucher.img);
      } else if (voucher.img instanceof File) {
        // If it's a File (e.g., from an input field), append as File
        formData.append('img', voucher.img);
      }
    }

    // Make the POST request with FormData
    const response = await postData('/api/admin/vouchers', formData);

    return response;
  } catch (error) {
    console.error('Error creating voucher:', error);
    throw new Error('Voucher could not be created');
  }
};

/**
 * Update a voucher by ID.
 * @param id - voucher ID.
 * @param updates - Updated voucher information.
 * @returns Promise<Voucher>
 */
export const updateVoucher = async (id: string, voucher: Voucher) => {
  try {
    // Create FormData for the update request
    const formData = new FormData();

    // Append required fields to FormData
    if (voucher.name) formData.append('name', voucher.name);
    if (voucher.code) formData.append('code', voucher.code);
    if (voucher.discount_percent !== undefined) {
      formData.append('discount_percent', voucher.discount_percent.toString()); // Convert number to string
    }
    if (voucher.start) formData.append('start', voucher.start.toISOString()); // Convert Date to ISO string
    if (voucher.end) formData.append('end', voucher.end.toISOString()); // Convert Date to ISO string
    if (voucher.limit !== undefined)
      formData.append('limit', voucher.limit.toString()); // Convert number to string

    // Optionally handle min_price
    if (voucher.min_price !== undefined) {
      formData.append('min_price', voucher.min_price.toString());
    }

    // Handle img update (either a string URL or a File)
    if (voucher.img) {
      if (typeof voucher.img === 'string') {
        // If it's a URL or string path, append as string
        formData.append('img', voucher.img);
      } else if (voucher.img instanceof File) {
        // If it's a File (e.g., from an input field), append as File
        formData.append('img', voucher.img);
      }
    }

    // Make the PUT request with FormData
    const response = await updateData(`/api/admin/vouchers/${id}`, formData);

    console.log('Updated voucher:', response);
    return response;
  } catch (error) {
    console.error(`Error updating voucher with id ${id}:`, error);
    throw new Error('Voucher could not be updated');
  }
};

/**
 * Delete a voucher by ID.
 * @param id - voucher ID.
 * @returns Promise<void>
 */
export const deleteVoucher = async (_id: string): Promise<void> => {
  try {
    await deleteData(`/api/admin/vouchers/${_id}`);
    console.log(`voucher with id ${_id} deleted.`);
  } catch (error) {
    console.error(`Error deleting voucher with id ${_id}:`, error);
    throw new Error('voucher could not be deleted');
  }
};
