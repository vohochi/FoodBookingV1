// Interface cho chi tiết trạng thái
export interface StatusDetails {
  count: number;
  totalAmount: number;
}

// Interface cho trạng thái đơn hàng (order statuses)
export interface IOrderStatus {
  cancelled: StatusDetails;
  processing: StatusDetails; // Sửa lại từ 'proccessing' thành 'processing' cho đúng chính tả
  success: StatusDetails;
  pending: StatusDetails;
}

// Interface cho trạng thái thanh toán (payment statuses)
export interface PaymentStatus {
  success: StatusDetails;
  failed: StatusDetails;
  pending: StatusDetails;
}

// Interface cho thống kê của tháng hiện tại (current month statistics)
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

// Interface cho thống kê theo năm (yearly statistics)
export interface YearlyStats {
  month: number;
  totalOrders: number;
  totalAmount: number;
  averageOrderValue: number;
}

// Interface chính cho toàn bộ dữ liệu của dashboard
export interface DashboardData {
  orderStatus: IOrderStatus;
  paymentStatus: PaymentStatus;
  currentMonth: CurrentMonthStats;
  yearlyStats: YearlyStats[];
}

// Interface chi tiết thống kê trạng thái đơn hàng (order status stats)
interface OrderStatusStats {
  count: number;
  totalAmount: number;
}

// Interface chi tiết thống kê trạng thái thanh toán (payment status stats)
interface PaymentStatusStats {
  count: number;
  totalAmount: number;
}

// Interface tổng quan (overview)
interface Overview {
  totalOrders: number;
  totalAmount: number;
  averageOrderValue: number;
}

// Interface thống kê trạng thái đơn hàng (status statistics)
interface StatusStatistics {
  cancelled: OrderStatusStats;
  processing: OrderStatusStats; // Sửa lỗi chính tả: 'proccessing' => 'processing'
  success: OrderStatusStats;
  pending: OrderStatusStats;
}

// Interface thống kê trạng thái thanh toán (payment status statistics)
interface PaymentStatusStatistics {
  success: PaymentStatusStats;
  failed: PaymentStatusStats;
  pending: PaymentStatusStats;
}

// Interface cho khoảng thời gian (period)
interface Period {
  start: string;
  end: string;
}

// Interface tổng hợp dữ liệu dashboard
export interface IDashboardData {
  data: {
    period: Period;
    overview: Overview;
    statusStatistics: StatusStatistics;
    paymentStatusStatistics: PaymentStatusStatistics;
  };
}
