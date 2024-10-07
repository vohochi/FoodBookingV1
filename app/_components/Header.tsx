// app/_components/Header.js
import Navigation from '@/app/_components/Navigation';
import TopBar from '@/app/_components/TopBar';
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
