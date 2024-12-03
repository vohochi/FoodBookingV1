// app/layout.tsx
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="vi">
      <head />
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
