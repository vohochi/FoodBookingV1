// categorySlice.ts

import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  updateCategory,
} from '@/_lib/categories';
import { Category } from '@/types/Category';
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

// Tạo async thunk để fetch categories
// export const fetchCategories = createAsyncThunk<
//   Category[],
//   void,
//   { rejectValue: string }
// >('categories/fetchCategories', async (_, { rejectWithValue }) => {
//   try {
//     const categories = await getCategories(); // Gọi hàm getCategories
//     console.log(categories);
//     return categories; // Trả về danh sách categories
//   } catch (error) {
//     console.log(error);
//     // Nếu có lỗi, trả về rejectWithValue
//     return rejectWithValue('Failed to fetch categories');
//   }
// });
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await getCategories(page, limit);
      console.log(data);
      return data; // Return both orders and pagination
    } catch {
      return rejectWithValue('Could not fetch orders');
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
  Category,
  Category,
  { rejectValue: string }
>('categories/createCategory', async (category, { rejectWithValue }) => {
  try {
    const response = await createCategory(category);
    return response.data as Category;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

export const updateCategoryThunk = createAsyncThunk<
  Category,
  { id: string; category: Category },
  { rejectValue: string }
>(
  'categories/updateCategory',
  async ({ id, category }, { rejectWithValue }) => {
    try {
      const response = await updateCategory(id, category);
      return response.data as Category;
    } catch (error) {
      return rejectWithValue((error as Error).message);
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
    setSelectedCategory: (state, action) => {
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
        state.categories.push(action.payload); // Thêm danh mục mới vào danh sách
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
        const index = state.categories.findIndex(
          (category) => category._id === action.payload._id
        );
        if (index !== -1) {
          // Cập nhật danh mục bằng đối tượng Category trả về từ API
          state.categories[index] = action.payload;
        }
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

// Xuất reducer
export const categoriesReducer = categoriesSlice.reducer;
