import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  styled,
  Stack,
  IconButton,
  Badge,
  Avatar,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import SearchField from '@/app/_components/Search'; // Thanh tìm kiếm
import {
  IconBellRinging,
  IconMenu,
  IconShoppingCart,
} from '@tabler/icons-react';
import FlagIcon from '@mui/icons-material/Flag'; // Biểu tượng cờ

// components

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    borderRadius: 13,
    [theme.breakpoints.up('lg')]: {
      minHeight: '70px',
    },
  }));

  const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        {/* Icon Menu cho mobile */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'inline',
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        {/* Thanh tìm kiếm */}
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <SearchField />
        </Box>

        {/* Các biểu tượng */}
        <Stack spacing={2} direction="row" alignItems="center">
          {/* Biểu tượng cờ */}
          <IconButton size="large" aria-label="change language" color="inherit">
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
              alt="Vietnam Flag"
              sx={{ width: 24, height: 24 }}
            />
          </IconButton>

          {/* Biểu tượng giỏ hàng */}
          <IconButton size="large" aria-label="cart" color="inherit">
            <Badge badgeContent={0} color="primary">
              <IconShoppingCart size="21" stroke="1.5" />
            </Badge>
          </IconButton>

          {/* Biểu tượng chuông thông báo */}
          {/* <IconButton size="large" aria-label="notifications" color="inherit"> */}
          <IconButton size="large" aria-label="notifications" color="inherit">
            <Badge
              variant="dot"
              color="transparent" // Đặt màu nền thành trong suốt
              sx={{
                '& .MuiBadge-dot': {
                  backgroundColor: ' #4BCF8B', // Màu nền trong suốt
                  border: '2px solid #ece8e8', // Đường viền nhấp nháy màu xanh
                  borderRadius: '50%', // Đảm bảo hình tròn
                  width: '8px', // Kích thước nhỏ
                  height: '8px', // Kích thước nhỏ
                  animation: 'blink 1s infinite', // Hiệu ứng nháy
                  '@keyframes blink': {
                    '0%': {
                      opacity: 1, // Ẩn
                    },
                    '50%': {
                      opacity: 0.5, // Nhạt
                    },
                    '100%': {
                      opacity: 1, // Hiện lại
                    },
                  },
                },
              }}
            >
              <IconBellRinging />
            </Badge>
          </IconButton>

          {/* Thông tin người dùng */}
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar alt="Mike Nielsen" src="/path/to/avatar.jpg" />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                Mike Nielsen
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Admin
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
