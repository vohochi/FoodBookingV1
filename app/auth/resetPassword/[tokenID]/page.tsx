// app/auth/register/checkout.tsx
import ResetPassForm from '@/_components/ResetPassForm';
import type { Metadata } from 'next';

// Metadata được định nghĩa ở server-side
export const metadata: Metadata = {
  title: 'Đổi mật khẩu tài khoản',
  description: 'Đổi mật khẩu tài khoản',
};

export default function Page({ params }: { params: { tokenID: string } }) {
  // Trả về Client Component (ResetPassForm) với token từ params
  return <ResetPassForm token={params.tokenID} />;
}
