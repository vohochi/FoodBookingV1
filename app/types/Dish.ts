// app/types/Dish.ts
export interface Dish {
  id: number; // Mã món ăn
  name: string; // Tên món ăn
  price: number; // Giá món ăn
  available: boolean; // Trạng thái có sẵn
  dateAdded: string; // Ngày thêm món ăn
  description: string; // Mô tả món ăn
  imageUrl: string; // Đường dẫn hình ảnh món ăn
  preparationTime: string; // Thời gian chuẩn bị
  ingredients: string[]; // Nguyên liệu của món ăn
  category: string; // Danh mục món ăn
}
