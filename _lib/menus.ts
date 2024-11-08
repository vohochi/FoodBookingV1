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
// src/api/dishApi.ts

export const createDish = async (dish: Menu) => {
  console.log(dish);
  try {
    // Tạo FormData
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append('name', dish.name);
    formData.append('description', dish.description);
    formData.append('price', dish.price.toString()); // Convert number to string
    formData.append('quantity', dish.quantity.toString()); // Convert number to string
    formData.append('category', dish.category.toString());

    formData.append('img', dish.img);
    // Gọi postData với FormData
    const response = await postData('/api/admin/menus', formData);

    return response;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Category could not be created');
  }
};

/**
 * Cập nhật thông tin món ăn theo ID
 * @param id - ID của món ăn
 * @param dish - Thông tin cập nhật món ăn
 * @returns Promise<Dish>
 */
export const updateDish = async (id: string, dish: Menu) => {
  try {
    // Tạo FormData
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append('name', dish.name);
    formData.append('description', dish.description);
    formData.append('price', dish.price.toString());
    formData.append('quantity', dish.quantity.toString());
    formData.append('category', dish.category.toString());

    // Append image if provided
    if (dish.img) {
      formData.append('img', dish.img);
    }

    // Use putData or postData with FormData for updating the dish
    const response = await updateData(`/api/admin/menus/${id}`, formData);

    console.log('Updated dish:', response);
    return response;
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
  limit: number,
  filters?: {
    category_id?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'price_asc' | 'price_desc';
  }
): Promise<Menu[]> => {
  try {
    let queryParams = `?page=${page}&limit=${limit}`;

    if (filters) {
      if (filters.category_id) {
        queryParams += `&category_id=${filters.category_id}`;
      }
      if (filters.minPrice) {
        queryParams += `&minPrice=${filters.minPrice}`;
      }
      if (filters.maxPrice) {
        queryParams += `&maxPrice=${filters.maxPrice}`;
      }
      if (filters.sort) {
        queryParams += `&sort=${filters.sort}`;
      }
    }

    const response: { menuItems: Menu[] } = await fetchData<{
      menuItems: Menu[];
    }>(`/api/menus${queryParams}`);
    return response.menuItems;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw new Error('Data could not be loaded');
  }
};
