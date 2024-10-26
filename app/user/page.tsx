'use client'
import React from 'react';
import dynamic from 'next/dynamic';

const MainHome = dynamic(() => import('@/_components/MainHome'));

export default function Home() {
  return (
    <>
      <MainHome />
    </>
  );
}
