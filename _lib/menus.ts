import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from '@/_lib/data-services';
import { Menu } from '@/types/Menu';

/**
 * Lấy tất cả các món ăn
 * @returns Promise<Dish[]>
 */
// Assuming your Menu interface is defined correctly

export const getDishes = async (): Promise<Menu[]> => {
  try {
    const response: { menuItems: Menu[] } = await fetchData<{
      menuItems: Menu[];
    }>('/api/menus');
    console.log(response);
    return response.menuItems;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw new Error('Data could not be loaded');
  }
};

/**
 * Lấy thông tin món ăn theo ID
 * @param id - ID của món ăn
 * @returns Promise<Dish>
 */
export const getDishById = async (id: string): Promise<Menu> => {
  try {
    const dish: Menu = await fetchData<Menu>(`/api/menus/${id}`);
    return dish;
  } catch (error) {
    console.error(`Error fetching dish with id ${id}:`, error);
    throw new Error('Data could not be loaded');
  }
};

/**
 * Tạo món ăn mới
 * @param dish - Thông tin món ăn
 * @returns Promise<Dish>
 */
export const createDish = async (dish: Menu): Promise<Menu> => {
  try {
    const data = await postData('/api/menus', dish);
    console.log('Created dish:', data);
    return data;
  } catch (error) {
    console.error('Error creating dish:', error);
    throw new Error('Dish could not be created');
  }
};

/**
 * Cập nhật thông tin món ăn theo ID
 * @param id - ID của món ăn
 * @param dish - Thông tin cập nhật món ăn
 * @returns Promise<Dish>
 */
export const updateDish = async (id: string, dish: Menu): Promise<Menu> => {
  try {
    const updatedDish: Menu = await updateData<Menu>(`/api/menus/${id}`, dish);
    console.log('Updated dish:', updatedDish);
    return updatedDish;
  } catch (error) {
    console.error(`Error updating dish with id ${id}:`, error);
    throw new Error('Dish could not be updated');
  }
};

/**
 * Xóa món ăn theo ID
 * @param id - ID của món ăn
 * @returns Promise<void>
 */
export const deleteDish = async (id: string): Promise<void> => {
  try {
    await deleteData(`/api/menus/${id}`);
    console.log(`Dish with id ${id} deleted.`);
  } catch (error) {
    console.error(`Error deleting dish with id ${id}:`, error);
    throw new Error('Dish could not be deleted');
  }
};

export const getDishesWithPagi = async (
  page: number,
  limit: number
): Promise<Menu[]> => {
  try {
    const response: { menuItems: Menu[] } = await fetchData<{
      menuItems: Menu[];
    }>(`/api/menus?page=${page}&limit=${limit}`);
    return response.menuItems;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw new Error('Data could not be loaded');
  }
};
