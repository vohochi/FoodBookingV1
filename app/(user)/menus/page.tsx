import React from 'react';
import UnderNavigation from '@/_components/UnderNavigation';
import Menus from '@/_components/Menus';
import '@/app/_styles/globals.css';

export const metadata = {
  title: 'Thực đơn | FoodBooking',
  description:
    'Khám phá menu đa dạng của FoodBooking, từ món ăn truyền thống đến những món ăn mới lạ, hấp dẫn. Tìm món ăn yêu thích của bạn ngay hôm nay!',
  keywords:
    'thực đơn, menu, món ăn, FoodBooking, dịch vụ giao đồ ăn, đặt món online, đồ uống',
};
const page = () => {
  return (
    <>
      <UnderNavigation />
      <main id="main">
        {/* ======= Menu Section ======= */}
        <Menus />
        {/* End Specials Section */}
      </main>
    </>
  );
};

export default page;
