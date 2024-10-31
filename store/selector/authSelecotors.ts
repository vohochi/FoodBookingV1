import { RootState } from '../index';

// Selectors

// Selectors for Auth State
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthVerifyEmail = (state: RootState) => state.auth.user;
