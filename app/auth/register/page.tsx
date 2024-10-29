// app/auth/register/page.tsx
import SignUp from '@/_components/SignUpForm';
import type { Metadata } from 'next';

// Metadata được định nghĩa ở server-side
export const metadata: Metadata = {
  title: 'Đăng ký',
  description: 'Tạo tài khoản mới',
};

// Server Component (mặc định)
export default function RegisterPage() {
  // Trả về Client Component (SignUpForm)
  return <SignUp />;
}
