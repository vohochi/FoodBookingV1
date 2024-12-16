import { GetUsersResponse, IUser } from '@/types/User';
import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from '@/_lib/data-services';

/**
 * Get all users with pagination.
 * @param page - Current page number.
 * @param limit - Number of users per page.
 * @returns Promise<{ total: number; users: IUser[] }>
 */ export const getAllUsers = async (
  page: number = 1,
  limit: number = 10,
  search?: string
): Promise<GetUsersResponse> => {
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
    const response = await fetchData<GetUsersResponse>(
      `/api/admin/users?${queryParams}`
    );

    // Map the response to match the GetUsersResponse interface

    return response;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Data could not be loaded');
  }
};

/**
 * Create a new user.
 * @param user - User information.
 * @returns Promise<IUser>
 */
export const createUser = async (user: IUser): Promise<IUser> => {
  try {
    // Extract phone from the address array and add it to the user object
    const userWithPhone = {
      ...user,
      phone:
        user.address && user.address[0] ? user.address[0].phone : undefined, // Extract phone number
    };

    // // Remove the address array, since phone is now a top-level property
    // delete userWithPhone.address;

    const newUser = await postData('/api/admin/users', userWithPhone);

    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User could not be created');
  }
};

/**
 * Update a user by ID.
 * @param id - User ID.
 * @param updates - Updated user information.
 * @returns Promise<IUser>
 */
export const updateUser = async (
  _id: string,
  updates: Partial<IUser>
): Promise<IUser> => {
  try {
    // Filter out undefined properties from updates
    const filteredUpdates: IUser = {
      ...updates,
      // Ensure you provide default values for required properties if needed
    } as IUser;
    console.log(filteredUpdates.password);
    const updatedUser = await updateData<IUser>(
      `/api/admin/users/${_id}`,
      filteredUpdates
    );
    // console.log(updatedUser);
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with id ${_id}:`, error);
    throw new Error('User could not be updated');
  }
};

/**
 * Delete a user by ID.
 * @param id - User ID.
 * @returns Promise<void>
 */
export const deleteUser = async (id: string): Promise<void> => {
  try {
    const res = await deleteData(`/api/admin/users/${id}`);
    console.log(res);
    console.log(`User with id ${id} deleted.`);
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    // Ném lại lỗi để removeUser có thể bắt được
    throw new Error(
      `Error deleting user with id ${id}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`
    );
  }
};
