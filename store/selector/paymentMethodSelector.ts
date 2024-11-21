import { RootState } from '../index';

// Selector to get all payment methods
export const selectPaymentMethods = (state: RootState) =>
  state.payment.paymentMethods.paymentMethods;

// Selector to get the current payment method
export const selectCurrentPaymentMethod = (state: RootState) =>
  state.payment.paymentMethods.currentPaymentMethod;

// Selector to get loading state
export const selectLoading = (state: RootState) =>
  state.payment.paymentMethods.loading;

// Selector to get error state
export const selectError = (state: RootState) =>
  state.payment.paymentMethods.error;

// Selector to get the total number of pages
export const selectTotalPages = (state: RootState) =>
  state.payment.paymentMethods.totalPages;

// Selector to get the current page
export const selectCurrentPage = (state: RootState) =>
  state.payment.paymentMethods.currentPage;
