// import { UserState } from '@/store/slice/userSlice';

import { RootState } from '@/store';

export const selectUsers = (state: RootState) => state.user.users || [];
export const selectUsersPagination = (state : RootState) => state.user.pagination;

// export const selectTotal = (state: RootState) =>
//   state.user.;
// export const selectLoading = (state: RootState) =>
//   state.loading;
// export const selectError = (state: RootState) =>
//   state.error;
// export const selectCurrentPage = (state: RootState) =>
//   state.currentPage;
// export const selectLimit = (state: RootState) =>
//   state.limit;
