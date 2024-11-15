// app/auth/register/checkout.tsx
import '@/app/_styles/globals.css';
import Checkout from '@/_components/CheckoutForm';
import type { Metadata } from 'next';
import UnderNavigation from '@/_components/UnderNavigation';

// Metadata được định nghĩa ở server-side
export const metadata: Metadata = {
  title: 'thanh toán',
  description: 'Thanh toán đơn hàng mới',
};

// Server Component (mặc định)
export default function Page() {
  // Trả về Client Component (SignUpForm)
  return (
    <>
      <UnderNavigation />
      <main id="main">
        <Checkout />
      </main>
    </>
  );
}
