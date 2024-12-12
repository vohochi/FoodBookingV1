import '@/app/_styles/globals.css';
import Wishlist from '@/_components/Wishlist';
import UnderNavigation from '@/_components/UnderNavigation';

import React from 'react';

export const metadata = {
  title: 'Danh sách yêu thích | FoodBooking',
  description:
    'Lưu trữ những món ăn yêu thích của bạn trên FoodBooking để dễ dàng đặt hàng sau này. Khám phá và thêm món ăn vào danh sách yêu thích của bạn ngay hôm nay!',
  keywords:
    'danh sách yêu thích, wishlist, FoodBooking, dịch vụ giao đồ ăn, đặt món online, [Loại món ăn]',
};
const page = () => {
  return (
    <>
      <UnderNavigation />
      <main id="main">
        {/* ======= Wishlist Section ======= */}
        <Wishlist />
        {/* End Wishlist Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default page;
