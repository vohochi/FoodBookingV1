import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from '@/_lib/data-services';
import { CategoriesResponse, Category } from '@/types/Category';

/**
 * Lấy tất cả các danh mục
 * @returns Promise<Category[]>
 */
export const getCategories = async (page: number, limit: number) => {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });
  const response = await fetchData<{
    data: CategoriesResponse;
  }>(`/api/category?${queryParams}`);

  console.log(response);
  try {
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Data could not be loaded');
  }
};

/**
 * Lấy thông tin danh mục theo ID
 * @param id - ID của danh mục
 * @returns Promise<Category>
 */

export const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const category: Category = await fetchData(`/api/category/${id}`);
    console.log(category);
    return category;
  } catch (error) {
    console.error(`Error fetching category with id ${id}:`, error);
    throw new Error('Data could not be loaded');
  }
};

/**
 * Tạo danh mục mới
 * @param category - Thông tin danh mục
 * @returns Promise<Category>
 */

export const createCategory = async (category: Category) => {
  try {
    // Tạo FormData
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    formData.append('img', category.img); // Giả sử category.img là File
    console.log(formData);
    // Gọi postData với FormData
    const response = await postData('/api/admin/cate', formData);

    // Trả về dữ liệu Category từ response
    return response;
  } catch (error) {
    console.error('Error creating category:', error);
    throw new Error('Category could not be created');
  }
};
/**
 * Cập nhật thông tin danh mục theo ID
 * @param id - ID của danh mục
 * @param category - Thông tin cập nhật danh mục
 * @returns Promise<Category>
 */
export const updateCategory = async (id: string, category: Category) => {
  try {
    // Tạo FormData
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('description', category.description);
    formData.append('img', category.img); // Giả sử category.img là File
    console.log(formData);
    // Gọi updateData với FormData
    const response = await updateData(`/api/admin/cate/${id}`, formData);

    return response;
  } catch (error) {
    console.error(`Error updating category with id ${id}:`, error);
    throw new Error('Category could not be updated');
  }
};
/**
 * Xóa danh mục theo ID
 * @param id - ID của danh mục
 * @returns Promise<void>
 */
export const deleteCategory = async (id: string): Promise<void> => {
  try {
    const response = await deleteData(`/api/admin/cate/${id}`);
    return response;
    console.log(`Category with id ${id} deleted.`);
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw new Error('Category could not be deleted');
  }
};
