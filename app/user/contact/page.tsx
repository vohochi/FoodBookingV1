import Contact from '@/_components/Contact';
import UnderNavigation from '@/_components/UnderNavigation';

import React from 'react';

export const metadata = {
  title: 'Contact',
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
