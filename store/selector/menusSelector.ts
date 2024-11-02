// /store/selectors/menusSelectors.ts

import { RootState } from '../index';

// Selector to get all menus
export const selectmenus = (state: RootState) => state.menus.items;

// Selector to get a single selected dish
export const selectSelectedDish = (state: RootState) =>
  state.menus.selectedDish;

// Selector to get loading state
export const selectmenusLoading = (state: RootState) => state.menus.loading;

// Selector to get error message
export const selectmenusError = (state: RootState) => state.menus.error;

// Selector to get pagination information
export const selectCurrentPage = (state: RootState) => state.menus.currentPage;
export const selectTotalPages = (state: RootState) => state.menus.totalPages;
export const selectItemsPerPage = (state: RootState) =>
  state.menus.itemsPerPage;
