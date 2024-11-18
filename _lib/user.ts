import { IUser } from '@/types/User';
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
 */
export const getAllUsers = async (
  page: number = 1,
  limit: number = 10
): Promise<{ total: number; users: IUser[] }> => {
  try {
    const response = await fetchData<{ total: number; users: IUser[] }>(
      `/api/admin/users?page=${page}&limit=${limit}`
    );
    console.log(response);
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
      phone: user.address && user.address[0] ? user.address[0].phone : undefined, // Extract phone number
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
  id: string,
  updates: Partial<IUser>
): Promise<IUser> => {
  try {
    // Filter out undefined properties from updates
    const filteredUpdates: IUser = {
      ...updates,
      // Ensure you provide default values for required properties if needed
    } as IUser;

    const updatedUser = await updateData<IUser>(
      `/api/admin/users/${id}`,
      filteredUpdates
    );
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
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
    await deleteData(`/api/admin/users/${id}`);
    console.log(`User with id ${id} deleted.`);
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw new Error('User could not be deleted');
  }
};
