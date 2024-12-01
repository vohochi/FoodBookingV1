'use client';

import * as React from 'react';
import { useEffect } from 'react';
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
import SearchField from '@/_components/Search';
import {
  IconBellRinging,
  IconMenu,
  IconShoppingCart,
  IconMoon,
  IconSettings,
  IconClock,
  IconLogout,
} from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ProfileState, setProfile } from '@/store/slice/profileSlice';
import { fetchUserProfile } from '@/_lib/profile';
import { useRouter } from 'next/navigation';
import { logout } from '@/_lib/auth';

interface ItemType {
  toggleMobileSidebar: (event: React.MouseEvent<HTMLElement>) => void;
}

const Header = ({ toggleMobileSidebar }: ItemType) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Get profile state from Redux
  const avatar = useSelector((state: RootState) => state.profile.avatar);
  const fullName = useSelector((state: RootState) => state.profile.fullname);
  const role = useSelector((state: RootState) => state.profile.role);
  const isLogin = useSelector((state: RootState) => !!state.profile);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        dispatch(setProfile(userProfile as ProfileState));
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Redirect to login if profile fetch fails
        router.push('/auth/login');
      }
    };

    if (isLogin) {
      loadUserProfile();
    } else {
      router.push('/auth/login');
    }
  }, [dispatch, isLogin, router]);

  const handleLogout = () => {
    logout();
    router.push('/auth/login');
  };

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

        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <SearchField searchType="menu" />
        </Box>

        <Stack spacing={2} direction="row" alignItems="center">
          <IconButton size="large" aria-label="change language" color="inherit">
            <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Vietnam.svg"
              alt="Vietnam Flag"
              sx={{ width: 24, height: 24 }}
            />
          </IconButton>

          <IconButton size="large" aria-label="cart" color="inherit">
            <Badge badgeContent={0} color="primary">
              <IconShoppingCart size="21" stroke="1.5" />
            </Badge>
          </IconButton>

          <IconButton size="large" aria-label="notifications" color="inherit">
            <Badge
              variant="dot"
              sx={{
                backgroundColor: 'transparent',
                '& .MuiBadge-dot': {
                  backgroundColor: '#4BCF8B',
                  border: '2px solid #ece8e8',
                  borderRadius: '50%',
                  width: '8px',
                  height: '8px',
                  animation: 'blink 1s infinite',
                  '@keyframes blink': {
                    '0%': { opacity: 1 },
                    '50%': { opacity: 0.5 },
                    '100%': { opacity: 1 },
                  },
                },
              }}
            >
              <IconBellRinging />
            </Badge>
          </IconButton>

          <IconButton size="large" aria-label="dark mode" color="inherit">
            <IconMoon />
          </IconButton>

          <IconButton size="large" aria-label="settings" color="inherit">
            <IconSettings />
          </IconButton>

          <IconButton size="large" aria-label="clock" color="inherit">
            <IconClock />
          </IconButton>

          <IconButton
            size="large"
            aria-label="logout"
            color="inherit"
            onClick={handleLogout}
          >
            <IconLogout />
          </IconButton>

          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              alt={fullName || 'Admin User'}
              src={avatar || '/default-avatar.jpg'}
            />
            <Box>
              <Typography variant="body1" fontWeight="bold">
                {fullName || 'Admin User'}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {role || 'Admin'}
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
