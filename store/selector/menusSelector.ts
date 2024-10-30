import { RootState } from '../index';

export const selectAllDishes = (state: RootState) => state.menusCrud.items;
export const selectDishesLoading = (state: RootState) =>
  state.menusCrud.loading;
export const selectDishesError = (state: RootState) => state.menusCrud.error;
export const selectSelectedDish = (state: RootState) =>
  state.menusCrud.selectedDish;
export const selectCurrentPage = (state: RootState) =>
  state.menusCrud.currentPage;
export const selectItemsPerPage = (state: RootState) =>
  state.menusCrud.itemsPerPage;
