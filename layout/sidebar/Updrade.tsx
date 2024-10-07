import React from 'react';
import { Box, Button } from '@mui/material';
import Link from 'next/link';
import { IconLogout } from '@tabler/icons-react';

export const Upgrade = () => {
  return (
    <Box display={'flex'} alignItems="center" gap={2} sx={{ m: 3 }}>
      <Button
        color="primary"
        target="_blank"
        disableElevation
        component={Link}
        href="https://www.wrappixel.com/templates/spike-nextjs-admin-template/"
        variant="contained"
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
