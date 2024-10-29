import React from 'react';
import UnderNavigation from '@/_components/UnderNavigation';
import Menus from '@/_components/Menus';
import '@/app/_styles/globals.css';

export const metadata = {
  title: 'List Menu',
};
// export const revalidate = 3600;

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
