import { RootState } from '../index';

// Selector to get all payment methods
export const selectPaymentMethods = (state: RootState) =>
  state.payment.paymentMethods;

// Selector to get the current payment method
export const selectCurrentPaymentMethod = (state: RootState) =>
  state.payment.currentPage;

// Selector to get loading state
export const selectLoading = (state: RootState) => state.payment.loading;

// Selector to get error state
export const selectError = (state: RootState) => state.payment.error;

// Selector to get the total number of pages
export const selectTotalPages = (state: RootState) => state.payment.totalPages;

// Selector to get the current page
export const selectCurrentPage = (state: RootState) =>
  state.payment.currentPage;
