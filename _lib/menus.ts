import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from '@/_lib/data-services';
import { GetMenusResponse, Menu, MenusParams } from '@/types/Menu';

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
    formData.append('price', (dish.price ?? 0).toString());
    formData.append('quantity', dish.quantity.toString()); // Convert number to string
    formData.append('category', dish.category.toString());
    if (dish.variant && Array.isArray(dish.variant)) {
      // Chuyển đổi mảng variant thành chuỗi JSON trước khi append
      formData.append('variant', JSON.stringify(dish.variant));
    }

    if (dish.img) {
      if (typeof dish.img === 'string') {
        // If it's a URL or string path, append as string
        formData.append('img', dish.img);
      } else if (dish.img instanceof File) {
        // If it's a File (e.g., from an input field), append as File
        formData.append('img', dish.img);
      }
    }

    // Gọi postData với FormData
    const response = await postData<Menu>(
      '/api/admin/menus',
      formData as unknown as Menu
    );
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
export const updateDish = async (id: string, menu: Menu) => {
  try {
    // Tạo FormData
    const formData = new FormData();

    // Append each field to the FormData object
    formData.append('name', menu.name);
    formData.append('description', menu.description);
    formData.append('price', (menu.price ?? 0).toString());
    formData.append('quantity', menu.quantity.toString());
    formData.append('category', menu.category.toString());

    // Kiểm tra nếu variant có tồn tại và là mảng
    if (menu.variant && Array.isArray(menu.variant)) {
      // Chuyển mảng variant thành chuỗi JSON và append vào FormData
      formData.append('variant', JSON.stringify(menu.variant));
    }

    // Append image if provided
    if (menu.img) {
      formData.append('img', menu.img);
    }

    // Gọi updateData với FormData
    const response = await updateData<Menu>(
      `/api/admin/menus/${id}`,
      formData as unknown as Menu
    );

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
    await deleteData(`/api/admin/menus/${id}`);
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
    name?: string; // Thêm filter theo tên
  }
): Promise<{
  menuItems: Menu[];
  currentPage: number;
  totalPages: number;
  totalMenuItems: number;
  limit: number;
  filters: {
    category_id?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: 'price_asc' | 'price_desc';
    name?: string; // Bao gồm cả name trong kết quả filters
  };
}> => {
  try {
    let queryParams = `?page=${page}&limit=${limit}`;

    if (filters) {
      if (filters.category_id) {
        queryParams += `&category=${filters.category_id}`;
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
      if (filters.name) {
        queryParams += `&name=${encodeURIComponent(filters.name)}`; // Mã hóa tên
      }
    }

    const response = await fetchData<{
      menuItems: Menu[];
      currentPage: number;
      totalPages: number;
      totalMenuItems: number;
      limit: number;
      filters: {
        category_id?: string;
        minPrice?: number;
        maxPrice?: number;
        sort?: 'price_asc' | 'price_desc';
        name?: string;
      };
    }>(`/api/menus${queryParams}`);

    return response;
  } catch (error) {
    console.error('Error fetching dishes:', error);
    throw new Error('Data could not be loaded');
  }
};

//here
export const getMenus = async ({
  name,
  page = 1,
  limit = 12,
  category,
  minPrice,
  maxPrice,
  sort,
}: MenusParams): Promise<GetMenusResponse> => {
  try {
    const queryParams = new URLSearchParams();
    if (name) queryParams.append('name', name);
    if (category) queryParams.append('category', category);
    if (minPrice !== undefined)
      queryParams.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined)
      queryParams.append('maxPrice', maxPrice.toString());
    if (sort) queryParams.append('sort', sort);

    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());

    const response = await fetchData<GetMenusResponse>(
      `/api/menus?${queryParams.toString()}`
    );

    return response;
  } catch (error) {
    console.error('Error fetching menus:', error);
    throw new Error('Data could not be loaded');
  }
};
