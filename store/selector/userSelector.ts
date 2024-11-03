import { UserState } from '@/store/slice/userSlice';

// Selectors
export const selectUsers = (state: { users: UserState }) => state.users.users;
export const selectLoading = (state: { users: UserState }) =>
  state.users.loading;
export const selectError = (state: { users: UserState }) => state.users.error;
