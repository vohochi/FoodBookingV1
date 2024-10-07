import React from 'react';
import UnderNavigation from '@/app/_components/UnderNavigation';
import Menus from '@/app/_components/Menus';

export const metadata = {
  title: 'List Menu',
};
// export const revalidate = 3600;

const page = ({ children }) => {
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
