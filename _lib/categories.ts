import {
  fetchData,
  postData,
  updateData,
  deleteData,
} from '@/_lib/data-services';
import { Category } from '@/types/Category';

/**
 * Lấy tất cả các danh mục
 * @returns Promise<Category[]>
 */
export const getCategories = async (): Promise<Category[]> => {
  try {
    const response: { categories: Category[] } = await fetchData(
      '/api/categories'
    );
    console.log(response);
    return response.categories;
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
    const category: Category = await fetchData(`/api/categories/${id}`);
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
export const createCategory = async (category: Category): Promise<Category> => {
  try {
    const data = await postData('/api/categories', category);
    console.log('Created category:', data);
    return data;
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
export const updateCategory = async (
  id: string,
  category: Category
): Promise<Category> => {
  try {
    const updatedCategory = await updateData(`/api/categories/${id}`, category);
    console.log('Updated category:', updatedCategory);
    return updatedCategory;
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
    await deleteData(`/api/categories/${id}`);
    console.log(`Category with id ${id} deleted.`);
  } catch (error) {
    console.error(`Error deleting category with id ${id}:`, error);
    throw new Error('Category could not be deleted');
  }
};
