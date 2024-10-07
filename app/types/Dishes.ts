export interface Dish {
  _id: string; // ID của món ăn (chuỗi)
  id: number; // ID (số nguyên)
  menu_id: number; // ID của menu liên quan
  name: string; // Tên món ăn
  image: string; // Đường dẫn hình ảnh của món ăn
  price: number; // Giá của món ăn (số nguyên)
  description: string; // Mô tả món ăn
}
