// import { UserState } from '@/store/slice/userSlice';

import { RootState } from '@/store';

export const selectUsers = (state: RootState) => state.user.users || [];

// export const selectTotal = (state: { adminUsers: UserState }) =>
//   state.adminUsers.total;
// export const selectLoading = (state: { adminUsers: UserState }) =>
//   state.adminUsers.loading;
// export const selectError = (state: { adminUsers: UserState }) =>
//   state.adminUsers.error;
// export const selectCurrentPage = (state: { adminUsers: UserState }) =>
//   state.adminUsers.currentPage;
// export const selectLimit = (state: { adminUsers: UserState }) =>
//   state.adminUsers.limit;
