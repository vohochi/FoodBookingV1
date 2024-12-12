import Contact from '@/_components/Contact';
import UnderNavigation from '@/_components/UnderNavigation';
import '@/app/_styles/globals.css';

import React from 'react';

export const metadata = {
  title: 'Liên hệ | FoodBooking', // Thêm tên website vào tiêu đề cho sự nhận diện
  description:
    'Liên hệ với FoodBooking để đặt hàng, đặt chỗ, hoặc để lại phản hồi. Chúng tôi rất vui được hỗ trợ bạn.', // Mô tả ngắn gọn về mục đích trang "Liên hệ"
  keywords:
    'liên hệ, contact, FoodBooking,Thức ăn, đặt món, đặt món online, giao hàng, nhà hàng, ẩm thực, Việt Nam, FoodBooking ', // Thêm các từ khóa liên quan
};
const page = () => {
  return (
    <>
      <UnderNavigation />
      <main id="main">
        {/* ======= Contact Section ======= */}
        <Contact />
        {/* End Contact Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default page;
