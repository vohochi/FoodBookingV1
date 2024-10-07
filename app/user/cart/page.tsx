import Cart from '@/app/_components/Cart';
import UnderNavigation from '@/app/_components/UnderNavigation';

import React from 'react';

export const metadata = {
  title: 'Cart',
};
const page = () => {
  return (
    <>
      <UnderNavigation />
      <main id="main">
        {/* ======= Menu Section ======= */}
        <Cart />
        {/* End Menu Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default page;
