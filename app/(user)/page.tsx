import React from 'react';
import dynamic from 'next/dynamic';

import '@/app/_styles/globals.css';

const MainHome = dynamic(() => import('@/_components/MainHome'));
export const metadata = {
  title: {
    template: '%s | FoodBooking - Đặt Món Ăn Ngon Tại Việt Nam',
    default: 'FoodBooking - Đặt Món Ăn Ngon, Giao Hàng Nhanh Tại Việt Nam',
  },
  description:
    'FoodBooking - Nơi bạn đặt món ăn ngon từ các nhà hàng hàng đầu tại Việt Nam, với đa dạng lựa chọn và giao hàng nhanh chóng. Trải nghiệm ẩm thực tuyệt vời, thanh toán dễ dàng và nhận ưu đãi hấp dẫn mỗi ngày. Đặt ngay!',
  keywords:
    'đặt món, đặt món online, giao hàng, nhà hàng, ẩm thực, Việt Nam, FoodBooking',
};
export default function Home() {
  return (
    <>
      <MainHome />
    </>
  );
}
