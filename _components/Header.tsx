import Navigation from '@/_components/Navigation';
import TopBar from '@/_components/TopBar';
import React from 'react';
import { useSession } from 'next-auth/react';
// import { login } from '@/_lib/auth';

const Header = () => {
  const { status } = useSession();
  console.log(status);
  // useEffect(() => {
  //   const handleLogin = async () => {
  //     console.log(status);
  //     if (status === 'authenticated') {
  //       try {
  //         const result = await login({
  //           email: 'chivo241023icloud@gmail.com',
  //           password: 'vohochi',
  //         });
  //         console.log('Login result:', result);
  //         // Có thể thêm logic để cập nhật session ở đây nếu cần
  //       } catch (error) {
  //         console.error('Login error:', error);
  //       }
  //     }
  //   };

  //   handleLogin();
  // }, [status]); // Chỉ theo dõi trạng thái `status` để gọi lại khi session thay đổi

  return (
    <>
      <TopBar />
      <Navigation />
    </>
  );
};

export default Header;
