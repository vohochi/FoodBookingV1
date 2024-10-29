// app/auth/register/checkout.tsx
import Checkout from '@/_components/CheckoutForm';
import type { Metadata } from 'next';

// Metadata được định nghĩa ở server-side
export const metadata: Metadata = {
  title: 'thanh toán',
  description: 'Thanh toán đơn hàng mới',
};

// Server Component (mặc định)
export default function Page() {
  // Trả về Client Component (SignUpForm)
  return <Checkout />;
}
