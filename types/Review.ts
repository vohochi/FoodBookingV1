export interface IReview {
  user: string; // ID của người dùng
  dish: string; // ID của món ăn
  rating: number; // Đánh giá từ 1 đến 5
  comment?: string; // Nhận xét, không bắt buộc
  createdAt?: Date; // Ngày tạo
  updatedAt?: Date; // Ngày cập nhật
}
