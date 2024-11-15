// utils/priceVN.ts
export const formatPrice = (price: number): string => {
  return price ? price.toLocaleString('vi-VN') : '0';
};
