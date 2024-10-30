import { RootState } from '../index';

// Selectors

// Selectors for Auth State
export const selectAuthStatus = (state: { auth: RootState }) =>
  state.auth.auth.status;
export const selectAuthError = (state: { auth: RootState }) =>
  state.auth.auth.error;
export const selectAuthUser = (state: RootState) => state.auth.user;
