import AboutHome from '@/_components/AboutHome';
import UnderNavigation from '@/_components/UnderNavigation';

import React from 'react';

export const metadata = {
  title: 'About',
};
const page = () => {
  return (
    <>
      <UnderNavigation />
      <main id="main">
        {/* ======= Contact Section ======= */}
        <AboutHome />
        {/* End Contact Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default page;
