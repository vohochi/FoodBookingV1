'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import { IconLogout } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { logout } from '@/_lib/auth';

export const Upgrade = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Gọi hàm logout
      await logout();

      // Hiển thị thông báo thành công
      toast.success('Logout thành công!');

      // Điều hướng đến trang đăng nhập
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);

      // Hiển thị thông báo lỗi
      toast.error('Đăng xuất thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={2} sx={{ m: 3 }}>
      <Button
        onClick={handleLogout}
        color="primary"
        disableElevation
        variant="contained"
        aria-label="logout"
        size="large"
        sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
      >
        <IconLogout style={{ marginRight: 8 }} />
        Logout
      </Button>
    </Box>
  );
};
