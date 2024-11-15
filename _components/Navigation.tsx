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
import { fetchUserProfile, } from '@/_lib/profile';
import { Drawer, List, ListItemText, IconButton, ListItemButton, Box } from '@mui/material';
import { AdminPanelSettings, Close, Logout } from '@mui/icons-material';
import { MdHome, MdMenuBook, MdInfo, MdContactMail } from 'react-icons/md';
import { logout } from '@/store/slice/authSlice';
import Cookies from 'js-cookie';
const Navigation = () => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  // const [isLogin, setIsLogin] = useState(false);

  const avatar = useSelector((state: RootState) => state.profile.avatar);
  const role = useSelector((state: RootState) => state.profile.role);
  const isLogin = useSelector((state: RootState) => !!state.profile);

  // useEffect(() => {
  //   setIsLogin(!!Cookies.get('access_token')); // Kiểm tra chỉ khi render client-side
  // }, []);

  const handleLogout = () => {
    dispatch(logout());
    console.log('logged out');

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
          <a href="/user">Sephir&Cheese</a>
        </h1>

        <nav
          id="navbar"
          className={`navbar order-last order-lg-0 ${showNavbar ? 'show' : ''}`}
        >
          <ul className={`d-flex align-items-center ${showNavbar ? 'flex-column' : 'flex-row'}`}>
            <li className="active">
              <Link href="/user">
                <span>Trang chủ</span>
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/user/menus">
                Thực đơn
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/user/about">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link className="nav-link" href="/user/contact">
                Liên hệ
              </Link>
            </li>
          </ul>
        </nav>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul className="d-flex align-items-center gap-2 position-relative">
            <li style={{ position: 'relative' }}>
              <Link href={'/user/cart'}>
                <FaCartShopping className="fa-lg" />
              </Link>
            </li>
            <li>
              <Link href={'/user/wishlist'} style={{ position: 'relative' }}>
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
                </div>
              </Link>
            </li>
            <li className="dropdown active ">
              <Link href={isLogin ? "/user/account/profile" : "/auth/login"}>
                {isLogin ? (
                  <Image
                    src={avatar || '/default-avatar.jpg'}
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
                      <Link className="nav-link scrollto" href="/user/account/profile">
                        Thông tin
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link scrollto" href="#" onClick={handleLogout}>
                        Đăng xuất
                      </Link>
                    </li>
                    {role == "admin" && (
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
        <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1a285a', color: '#fff' }}>
          <ListItemText primary="Sephir&Cheese" sx={{ fontSize: "30px" }} />
          <IconButton onClick={toggleNavbar}>
            <Close sx={{ color: '#fff' }} />
          </IconButton>
        </div>

        <List sx={{ color: '#1a285a' }}>
          {[
            { href: '/user', icon: <MdHome />, text: 'Trang chủ' },
            { href: '/user/menus', icon: <MdMenuBook />, text: 'Thực đơn' },
            { href: '/user/cart', icon: <FaCartShopping />, text: 'Giỏ hàng' },
            { href: '/user/about', icon: <MdInfo />, text: 'Về chúng tôi' },
            { href: '/user/contact', icon: <MdContactMail />, text: 'Liên hệ' },
            { href: '/user/wishlist', icon: <FaHeart />, text: 'Yêu thích' },
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
                <ListItemButton key={href} component={Link} href={href}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                      color: '#1a285a',
                    },
                  }}
                >
                  <FaSignInAlt className="fa-lg" style={{ marginRight: '8px' }} />
                  <ListItemText primary={href.includes('login') ? 'Đăng nhập' : 'Đăng ký'} />
                </ListItemButton>
              ))}
            </>
          ) : (
            <>
              <ListItemButton component={Link} href="/user/account/profile" sx={{
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  color: '#1a285a',
                },
              }}>
                <FaUser className="fa-lg" style={{ marginRight: '8px' }} />
                <ListItemText primary="Thông tin tài khoản" />
              </ListItemButton>
              {role === 'admin' && (
                <ListItemButton component={Link} href="/admin"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#e0e0e0',
                      color: '#1a285a',
                    },
                  }}
                >
                  <AdminPanelSettings className="fa-lg" style={{ marginRight: '8px' }} />
                  <ListItemText primary="Quản trị" />
                </ListItemButton>
              )}
              <ListItemButton onClick={handleLogout}
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

    </header >
  );
};

export default Navigation;
