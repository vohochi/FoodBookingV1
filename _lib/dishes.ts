import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from '@/_lib/data-services';
import { Dish } from '@/types/Dishes';

/**
 * Lấy tất cả các món ăn
 * @returns Promise<Dish[]>
 */
export const getDishes = async (): Promise<Dish[]> => {
  try {
    const data = await fetchData('/api/dishes');
    console.log('Dishes:', data);
    return data;
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
export const getDishById = async (id: string): Promise<Dish> => {
  try {
    const data = await fetchData(`/api/dishes/${id}`);
    console.log('Dish:', data);
    return data;
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
export const createDish = async (dish: Dish): Promise<Dish> => {
  try {
    const data = await postData('/api/dishes', dish);
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
export const updateDish = async (
  id: string,
  dish: Partial<Dish>
): Promise<Dish> => {
  try {
    const data = await updateData(`/api/dishes/${id}`, dish);
    console.log('Updated dish:', data);
    return data;
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
    await deleteData(`/api/dishes/${id}`);
    console.log(`Dish with id ${id} deleted.`);
  } catch (error) {
    console.error(`Error deleting dish with id ${id}:`, error);
    throw new Error('Dish could not be deleted');
  }
};
