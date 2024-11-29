import { RootState } from '@/store'; // Adjust the import according to your project structure

// Selector for getting orderStatus
export const selectOrderStatus = (state: RootState) =>
  state.dashboardStatics.orderStatus;
