
import React from 'react';
import dynamic from 'next/dynamic';

import '@/app/_styles/globals.css';

const MainHome = dynamic(() => import('@/_components/MainHome'));
export const metadata = {
  title: {
    template: '%s / FoodBooking Home',
    default: 'Welcome / FoodBooking Home',
  },
  description:
    'Cửa hàng thực phẩm sang trọng, nằm ở trung tâm của Việt Nam, được bao quanh bởi khung cảnh tuyệt đẹp không gian chill thư giản ',
};
export default function Home() {
  return (
    <>
      <MainHome />
    </>
  );
}
