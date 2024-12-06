'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'boxicons/css/boxicons.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Josefin_Sans } from 'next/font/google';
import { ReservationProvider } from '@/_components/ReservationContext';
import Header from '@/_components/Header';
import Footer from '@/_components/Footer';
import '@/app/_styles/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { SessionProvider } from 'next-auth/react';

const josefin = Josefin_Sans({
  subsets: ['latin'],
  display: 'optional',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${josefin.className}`}>
        <SessionProvider>
          <Provider store={store}>
            <Header />
            <ReservationProvider>{children}</ReservationProvider>
            <Footer />
          </Provider>
        </SessionProvider>
        {/* <script src="/animations/main.js" defer></script> */}
      </body>
    </html>
  );
}
