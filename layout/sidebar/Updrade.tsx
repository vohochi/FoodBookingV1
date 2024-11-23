'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { IconLogout } from '@tabler/icons-react';
import { logout } from '@/_lib/auth';

export const Upgrade = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };
  return (
    <Box display={'flex'} alignItems="center" gap={2} sx={{ m: 3 }}>
      <Button
        onClick={handleLogout}
        color="primary"
        target="_blank"
        disableElevation
        component={Link}
        variant="contained"
        href="/auth/login"
        aria-label="logout"
        size="large"
        sx={{ width: '100%', display: 'flex', alignItems: 'center' }} // Đảm bảo button có flex để căn chỉnh icon và chữ
      >
        <IconLogout style={{ marginRight: 8 }} />{' '}
        {/* Thêm khoảng cách giữa icon và chữ */}
        Logout
      </Button>
    </Box>
  );
};
