'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaHeart, FaSignInAlt, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { FaCartShopping } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ProfileState, setProfile } from '@/store/slice/profileSlice';
import { fetchUserProfile } from '@/_lib/profile';
import {
  Drawer,
  List,
  ListItemText,
  IconButton,
  ListItemButton,
  Box,
  styled,
  InputBase,
  alpha,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import ClearIcon from '@mui/icons-material/Clear';
import { AdminPanelSettings, Close, Logout } from '@mui/icons-material';
import { MdHome, MdMenuBook, MdInfo, MdContactMail } from 'react-icons/md';
// import { logout } from '@/store/slice/userSlice';
import { setSearchTerm } from '@/store/slice/filterSlice';
import { getValidSrc } from './ValidImage';
import { selectCartItems } from '@/store/selector/cartSelectors';
import { logout } from '@/_lib/auth';
import { useRouter } from 'next/navigation';
import SnackbarNotification from './SnackbarAlert';
import { signOut } from 'next-auth/react';
const Navigation = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const avatar = useSelector((state: RootState) => state.profile.avatar);
  const role = useSelector((state: RootState) => state.profile.role);
  const items = useSelector(selectCartItems);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');

  const test = useSelector((state: RootState) => state.profile.fullname);
  useEffect(() => {
    if (test === undefined) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [test]);

  const handleLogout = async () => {
    try {
      // Gọi hàm logout
      await logout();
      await signOut({
        redirect: false,
      });

      router.push('/auth/login');
      setSnackbarMessage(`Đăng xuất thành công!`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfile();
        dispatch(setProfile(userProfile as ProfileState));
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    if (isLogin) {
      loadUserProfile();
    }
  }, [dispatch, isLogin]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div
        className={`overlay ${showNavbar ? 'show' : ''}`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          e.preventDefault();
          toggleNavbar();
        }}
      />

      <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
        <h1 className="logo me-auto me-lg-0">
          <a href="/">Sephir&Cheese</a>
        </h1>

        <nav
          id="navbar"
          className={`navbar order-last order-lg-0 ${showNavbar ? 'show' : ''}`}
        >
          <ul
            className={`d-flex align-items-center ${
              showNavbar ? 'flex-column' : 'flex-row'
            }`}
          >
            <li className="active">
              <Link href="/">
                <span>Trang chủ</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/menus">
                Thực đơn
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/about">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/contact">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul className="d-flex align-items-center gap-2 position-relative">
            <li>
              <Search sx={{ border: '1px solid rgba(0,0,0,0.1)' }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={handleSearch}
                  placeholder="Ăn gì đây..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </li>
            <li style={{ position: 'relative' }}>
              <Link href={'/cart'}>
                <FaCartShopping className="fa-lg" />
                <Badge
                  badgeContent={items ? items.length : '0'}
                  color="error"
                  overlap="circular"
                  sx={{
                    '.MuiBadge-dot': { fontSize: '10px' },
                    position: 'relative',
                    top: '-14px',
                    right: '-4px',
                  }}
                />
              </Link>
            </li>
            <li>
              <Link href={'/wishlist'} style={{ position: 'relative' }}>
                <div
                  className="rounded-circle border p-2"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'transform 1s ease',
                  }}
                >
                  <FaHeart
                    className={`${isFavorite ? 'favorite' : ''}`}
                    style={{
                      fontSize: '24px',
                      color: 'red',
                    }}
                    onClick={toggleFavorite}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = 'scale(1.2)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = 'scale(1)')
                    }
                  />
                  <Badge
                    badgeContent={wishlistItems.length}
                    color="error"
                    overlap="circular"
                    sx={{
                      '.MuiBadge-dot': { fontSize: '10px' },
                      position: 'relative',
                      top: '-14px',
                      right: '-4px',
                    }}
                  />
                </div>
              </Link>
            </li>
            <li className="dropdown active ">
              <Link href={isLogin ? '/account/profile' : '/auth/login'}>
                {isLogin ? (
                  <Image
                    src={getValidSrc(`${avatar}` || `default.jpg`)}
                    alt="avatar"
                    className="rounded-circle"
                    width={40}
                    height={40}
                  />
                ) : (
                  <FaUser className="fa-lg" />
                )}
              </Link>
              <ul>
                {!isLogin ? (
                  <>
                    <li>
                      <Link className="nav-link scrollto" href="/auth/login">
                        Đăng nhập
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link scrollto" href="/auth/register">
                        Đăng ký
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        className="nav-link scrollto"
                        href="/account/profile"
                      >
                        Thông tin
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="nav-link scrollto"
                        href="#"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </Link>
                    </li>
                    {role == 'admin' && (
                      <li>
                        <Link className="nav-link scrollto" href="/admin">
                          Quản trị
                        </Link>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </li>
          </ul>
        </nav>
        {/* Navbar for Mobile */}
        <div className="navbar align-items-center justify-content-center flex-grow-1 d-lg-none d-md-none">
          <ul className="d-flex align-items-center gap-2 position-relative">
            <li>
              <Search
                sx={{ border: '1px solid rgba(0,0,0,0.1)', padding: '0' }}
              >
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  onChange={handleSearch}
                  placeholder="Ăn gì đây..."
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
            </li>
          </ul>
        </div>
        <GiHamburgerMenu
          style={{ color: '#1a285a' }}
          className="mobile-nav-toggle"
          onClick={toggleNavbar}
        />
      </div>
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={showNavbar}
        onClose={toggleNavbar}
        sx={{
          width: 250,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 250,
            boxSizing: 'border-box',
          },
        }}
      >
        <div
          style={{
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#1a285a',
            color: '#fff',
          }}
        >
          <ListItemText primary="Sephir&Cheese" sx={{ fontSize: '30px' }} />
          <IconButton onClick={toggleNavbar}>
            <Close sx={{ color: '#fff' }} />
          </IconButton>
        </div>
        <List sx={{ color: '#1a285a' }}>
          {[
            { href: '/', icon: <MdHome />, text: 'Trang chủ' },
            { href: '/menus', icon: <MdMenuBook />, text: 'Thực đơn' },
            { href: '/cart', icon: <FaCartShopping />, text: 'Giỏ hàng' },
            { href: '/about', icon: <MdInfo />, text: 'Về chúng tôi' },
            { href: '/contact', icon: <MdContactMail />, text: 'Liên hệ' },
            { href: '/wishlist', icon: <FaHeart />, text: 'Yêu thích' },
          ].map(({ href, icon, text }) => (
            <ListItemButton
              key={href}
              component={Link}
              href={href}
              sx={{
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  color: '#1a285a',
                },
              }}
            >
              <Box sx={{ marginRight: '8px' }}>{icon}</Box>
              <ListItemText primary={text} />
            </ListItemButton>
          ))}

          {!isLogin ? (
            <>
              {['/auth/login', '/auth/register'].map((href) => (
                <ListItemButton
                  key={href}
                  component={Link}
                  href={href}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                      color: '#1a285a',
                    },
                  }}
                >
                  <FaSignInAlt
                    className="fa-lg"
                    style={{ marginRight: '8px' }}
                  />
                  <ListItemText
                    primary={href.includes('login') ? 'Đăng nhập' : 'Đăng ký'}
                  />
                </ListItemButton>
              ))}
            </>
          ) : (
            <>
              <ListItemButton
                component={Link}
                href="/account/profile"
                sx={{
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                    color: '#1a285a',
                  },
                }}
              >
                <FaUser className="fa-lg" style={{ marginRight: '8px' }} />
                <ListItemText primary="Thông tin tài khoản" />
              </ListItemButton>
              {role === 'admin' && (
                <ListItemButton
                  component={Link}
                  href="/admin"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                      color: '#1a285a',
                    },
                  }}
                >
                  <AdminPanelSettings
                    className="fa-lg"
                    style={{ marginRight: '8px' }}
                  />
                  <ListItemText primary="Quản trị" />
                </ListItemButton>
              )}
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                    color: '#1a285a',
                  },
                }}
              >
                <Logout className="fa-lg" style={{ marginRight: '8px' }} />
                <ListItemText primary="Đăng xuất" />
              </ListItemButton>
            </>
          )}
        </List>
      </Drawer>
      <SnackbarNotification
        snackbarOpen={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        snackbarOnclose={() => setSnackbarOpen(false)}
      />
    </header>
  );
};

export default Navigation;
