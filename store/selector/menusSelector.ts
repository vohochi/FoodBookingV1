// /store/selectors/menusSelectors.ts

import { RootState } from '../index';

// Selector to get all menus
export const selectMenus = (state: RootState) => state.menus.items;

// Selector to get a single selected dish
export const selectSelectedDish = (state: RootState) =>
  state.menus.filters.category_id;

// Selector to get loading state
export const selectMenusLoading = (state: RootState) => state.menus.loading;

// Selector to get error message
export const selectMenusError = (state: RootState) => state.menus.error;

// Selector to get pagination information
export const selectCurrentPage = (state: RootState) => state.menus.currentPage;
export const selectTotalPages = (state: RootState) => state.menus.totalPages;
export const selectItemsPerPage = (state: RootState) =>
  state.menus.itemsPerPage;

// Selector to get current filters (category_id, price range, sort order)
export const selectFilters = (state: RootState) => state.menus.filters;
