// app/auth/register/checkout.tsx
import SignIn from '@/_components/LoginForm';
import type { Metadata } from 'next';

// Metadata được định nghĩa ở server-side
export const metadata: Metadata = {
  title: 'Đăng nhập',
  description: 'Đăng nhập tài khoản',
};

// Server Component (mặc định)
export default function Page() {
  // Trả về Client Component (SignUpForm)
  return <SignIn />;
}
