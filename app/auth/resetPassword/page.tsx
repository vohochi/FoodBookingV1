// app/auth/register/checkout.tsx
import ResetPassForm from '@/_components/ResetPassForm';
import type { Metadata } from 'next';

// Metadata được định nghĩa ở server-side
export const metadata: Metadata = {
  title: 'Đổi mật khẩu tài khoản',
  description: 'Đổi mật khẩu tài khoản',
};

// Server Component (mặc định)
export default function Page() {
  // Trả về Client Component (SignUpForm)
  return <ResetPassForm />;
}
