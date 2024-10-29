'use client'
import React from 'react';
import dynamic from 'next/dynamic';

import '@/app/_styles/globals.css';

const MainHome = dynamic(() => import('@/_components/MainHome'));

export default function Home() {
  return (
    <>
      <MainHome />
    </>
  );
}
