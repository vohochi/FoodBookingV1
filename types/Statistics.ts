// export Interface for individual status details
export interface StatusDetails {
  count: number;
  totalAmount: number;
}

// export Interface for order statuses
export interface IOrderStatus {
  processing: StatusDetails; // Use 'processing' for consistency
  success: StatusDetails;
  cancelled: StatusDetails;
  pending: StatusDetails;
}

// export Interface for payment statuses
export interface PaymentStatus {
  success: StatusDetails;
  failed: StatusDetails;
  pending: StatusDetails;
}

// export Interface for current month statistics
export interface CurrentMonthStats {
  _id: string | null;
  totalOrders: number;
  totalAmount: number;
  averageOrderValue: number;
  successfulOrders: number;
  canceledOrders: number;
  month: number;
  year: number;
}

// export Interface for yearly statistics
export interface YearlyStats {
  month: number;
  totalOrders: number;
  totalAmount: number;
  averageOrderValue: number;
}

// Main export interface for the entire data structure
export interface DashboardData {
  orderStatus: IOrderStatus;
  paymentStatus: PaymentStatus;
  currentMonth: CurrentMonthStats;
  yearlyStats: YearlyStats[];
}
