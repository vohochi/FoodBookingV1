// categorySlice.ts

import {
  createCategory,
  deleteCategory,
  getCategoriesPi,
  getCategoryById,
  updateCategory,
} from '@/_lib/categories';
import { Category, CreateCategoryResponse } from '@/types/Category';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface CategoriesState {
  categories: Category[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  loading: boolean;
  error: string | null;
  selectedCategory: Category | null;
}

const initialState: CategoriesState = {
  categories: [],
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  loading: false,
  error: null,
  selectedCategory: null,
};

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (
    { page, limit, name }: { page: number; limit: number; name?: string },
    { rejectWithValue }
  ) => {
    try {
      // Gọi hàm getCategoriesPi với các tham số page, limit và name
      const { data } = await getCategoriesPi(page, limit, name);
      return data; // Trả về cả categories và pagination
    } catch (error) {
      console.log(error);
      // Nếu có lỗi, trả về thông báo lỗi
      return rejectWithValue('Could not fetch categories');
    }
  }
);

// Tạo async thunk để fetch category theo ID
export const fetchCategoryById = createAsyncThunk<
  Category | null, // Specify Category | null as return type
  string,
  { rejectValue: string }
>('dishes/fetchDishById', async (id, { rejectWithValue }) => {
  try {
    const data = await getCategoryById(id);
    return data; // Return the data
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

export const createCategoryThunk = createAsyncThunk<
  CreateCategoryResponse, // Trả về toàn bộ đối tượng CreateCategoryResponse
  Category,
  { rejectValue: string }
>('categories/createCategory', async (category, { rejectWithValue }) => {
  try {
    // Gọi API tạo danh mục
    const response = await createCategory(category);

    // Trả về toàn bộ response (CreateCategoryResponse)
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const updateCategoryThunk = createAsyncThunk<
  CreateCategoryResponse, // Trả về toàn bộ đối tượng CreateCategoryResponse nếu API trả về phản hồi này
  { id: string; category: Category }, // Tham số gồm id và category
  { rejectValue: string }
>(
  'categories/updateCategory',
  async ({ id, category }, { rejectWithValue }) => {
    try {
      // Gọi API cập nhật danh mục
      const response = await updateCategory(id, category);

      // Trả về toàn bộ response (CreateCategoryResponse)
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

export const deleteCategoryThunk = createAsyncThunk<void, string>(
  'categories/deleteCategory',
  async (id) => {
    await deleteCategory(id); // API để xóa danh mục
  }
);

// Tạo slice cho categories
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setSelectedCategories: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Xử lý fetchCategories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true; // Bắt đầu loading
        state.error = null; // Reset error
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        const { categories, pagination } = action.payload;
        state.categories = categories;
        if (pagination) {
          state.totalPages = pagination.totalPages;
          state.totalItems = pagination.totalItems;
          state.currentPage = pagination.currentPage;
        } else {
          // Default values if pagination is not provided
          state.totalPages = 1;
          state.totalItems = categories.length;
          state.currentPage = 1;
        }
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false; // Kết thúc loading
        state.error = action.payload as string; // Cập nhật lỗi
      })
      // Xử lý fetchCategoryById
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true; // Bắt đầu loading cho category
        state.error = null; // Reset error
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false; // Kết thúc loading
        state.selectedCategory = action.payload; // Cập nhật category đã chọn
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false; // Kết thúc loading
        state.error = action.payload as string; // Cập nhật lỗi
      })
      // Create category
      .addCase(createCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        // Thêm danh mục mới vào danh sách, dùng action.payload.data để lấy Category
        state.categories.push(action.payload.data); // action.payload chứa CreateCategoryResponse, lấy data là Category
        state.loading = false;
      })

      .addCase(createCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create category';
      })
      // Update category
      .addCase(updateCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCategoryThunk.fulfilled, (state, action) => {
        // Tìm index của danh mục trong state.categories theo _id
        const index = state.categories.findIndex(
          (category) => category._id === action.payload.data._id // Kiểm tra _id của danh mục được trả về từ API
        );

        console.log(index);

        if (index !== -1) {
          // Cập nhật danh mục trong state với dữ liệu mới từ API
          state.categories[index] = action.payload.data; // Thay thế category cũ bằng category mới
        }

        // Đặt trạng thái loading về false khi hoàn thành
        state.loading = false;
      })

      .addCase(updateCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update category';
      })
      // Delete category
      .addCase(deleteCategoryThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.meta.arg
        ); // Xóa danh mục
        state.loading = false;
      })
      .addCase(deleteCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete category';
      });
  },
});

export const { setSelectedCategories } = categoriesSlice.actions;

// Xuất reducer
export const categoriesReducer = categoriesSlice.reducer;
