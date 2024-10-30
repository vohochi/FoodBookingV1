import Wishlist from '@/_components/Wishlist';
import UnderNavigation from '@/_components/UnderNavigation';

import React from 'react';

export const metadata = {
  title: 'Wishlist',
};
const page = () => {
  return (
    <>
      <UnderNavigation />
      <main id="main" >
        {/* ======= Wishlist Section ======= */}
        <Wishlist />
        {/* End Wishlist Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default page;
