// selectors.ts hoặc trong chính categorySlice.ts
import { RootState } from '@/store';

// Selector lấy danh sách categories từ RootState
export const selectCategories = (state: RootState) =>
  state.categories.categories;

// Selector lấy loading state từ RootState
export const selectCategoriesLoading = (state: RootState) =>
  state.categories.loading;

// Selector lấy error state từ RootState
export const selectCategoriesError = (state: RootState) =>
  state.categories.error;

export const selectCategory = (state: RootState) =>
  state.categories.selectedCategory;
