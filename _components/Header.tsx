// app/_components/Header.js
import Navigation from '@/_components/Navigation';
import TopBar from '@/_components/TopBar';
import React from 'react';

const Header = () => {
  return (
    <>
      <TopBar />
      {/* ======= Header ======= */}
      <Navigation />
    </>
  );
};

export default Header;
