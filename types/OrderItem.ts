export interface IOrderItem {
  order: string; // ID của đơn hàng
  dish: string; // ID của món ăn
  quantity: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
