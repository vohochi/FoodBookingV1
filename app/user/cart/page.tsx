import Cart from '@/_components/Cart';
import UnderNavigation from '@/_components/UnderNavigation';
import '@/app/_styles/globals.css';

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
