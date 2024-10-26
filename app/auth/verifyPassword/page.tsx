// app/auth/register/checkout.tsx
import VerifyForm from '@/_components/VerifyForm';
import type { Metadata } from 'next';

// Metadata được định nghĩa ở server-side
export const metadata: Metadata = {
  title: 'Xác nhận tài khoản',
  description: 'Xác nhận tài khoản',
};

// Server Component (mặc định)
export default function Page() {
  // Trả về Client Component (SignUpForm)
  return <VerifyForm />;
}
