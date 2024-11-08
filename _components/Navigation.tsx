'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaHeart, FaUser } from 'react-icons/fa';
import Image from 'next/image';
import { FaCartShopping } from 'react-icons/fa6';
import { getUserProfile } from '@/_lib/user';

const Navigation = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name: string; avatar: string } | null>(null);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  // Hàm kiểm tra và lấy `accessToken` từ cookie
  function getAccessTokenFromCookie(): string | null {
    const match = document.cookie.match(/(^|;\s*)accessToken=([^;]*)/);
    return match ? decodeURIComponent(match[2]) : null;
  }

  useEffect(() => {
    async function logUserProfile() {
      const accessToken = getAccessTokenFromCookie();
      console.log(accessToken);

      if (accessToken) {
        try {
          const profile = await getUserProfile();
          setUserProfile(profile);
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setIsLoggedIn(false);
        setUserProfile(null);
      }
    }

    logUserProfile();
  }, []);

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
              <Link href={isLoggedIn ? "/user/account/profile" : "/auth/login"}>
                {isLoggedIn ? (
                  <Image
                    src={userProfile?.avatar || '/default-avatar.jpg'} // Hiển thị avatar nếu có
                    alt="avatar"
                    className="rounded-circle"
                    width={40}
                    height={40}
                    style={{ marginLeft: '16px' }}
                  />
                ) : (
                  <FaUser className="fa-lg" />
                )}
              </Link>
              <ul>
                {!isLoggedIn ? (
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
                  <li>
                    <Link className="nav-link scrollto" href="/auth/logout">
                      Đăng xuất
                    </Link>
                  </li>
                )}
                {isLoggedIn && (
                  <li>
                    <Link className="nav-link scrollto" href="/user/account/profile">
                      Thông tin
                    </Link>
                  </li>
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

      {showNavbar && (
        <nav className="mobile-navbar">
          <ul>
            <li>
              <Link href="/user">Trang chủ</Link>
            </li>
            <li>
              <Link href="/user/menus">Thực đơn</Link>
            </li>
            <li>
              <Link href="/user/cart">Giỏ hàng</Link>
            </li>
            <li>
              <Link href="/user/about">Về chúng tôi</Link>
            </li>
            <li>
              <Link href="/user/contact">Liên hệ</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navigation;
