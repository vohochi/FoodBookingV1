// utils/priceVN.ts
export const formatPrice = (price: number | undefined): string => {
  return price ? price.toLocaleString('vi-VN') : '0';
};
