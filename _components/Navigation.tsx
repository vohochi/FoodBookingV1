'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaHeart, FaUser, FaSearch } from 'react-icons/fa';
import Image from 'next/image';
import { FaCartShopping } from 'react-icons/fa6';

const Navigation = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNavbar, setShowNavbar] = useState(false);
  const isLoggedIn = false;

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Searching for:', searchTerm);
    }
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
          <ul
            className={`d-flex align-items-center ${
              showNavbar ? 'flex-column' : 'flex-row'
            }`}
          >
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
            <li className="search-bar" style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className={`form-control transition-all duration-300 ease-in-out ${
                  showSearch ? 'translate-x-0' : 'translate-x-full'
                }`}
                style={{
                  top: '-20px',
                  width: '180px',
                  marginRight: '0px',
                  position: 'absolute',
                  right: '-30px',
                  transition: 'transform 0.3s ease-in-out',
                  opacity: showSearch ? '1' : '0',
                  visibility: showSearch ? 'visible' : 'hidden',
                }}
              />
            </li>
            <li>
              <Link
                href={'#'}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  toggleSearch();
                }}
              >
                <FaSearch className="fa-lg" />
              </Link>
            </li>
            <li style={{ position: 'relative' }}>
              <Link href={'/user/cart'}>
                <FaCartShopping className="fa-lg" />
              </Link>
              <span
                className="rounded bg-warning text-light p-1 py-0 text-center"
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  fontSize: '12px',
                }}
              >
                {/* {localStorage.getItem('cartCount') || 0} */}
              </span>
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
                  <span
                    className="rounded bg-warning text-light p-1 py-0 text-center"
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '0px',
                      fontSize: '12px',
                    }}
                  >
                    0
                  </span>
                </div>
              </Link>
            </li>
            <li className="dropdown active ">
              <Link
                href="/user/account/profile"
                className="d-flex align-items-center"
              >
                {!isLoggedIn ? (
                  <FaUser className="fa-lg" />
                ) : (
                  <Image
                    src="/path/to/avatar.jpg" // Cập nhật đường dẫn avatar
                    alt="avatar"
                    className="rounded-circle"
                    width={40}
                    height={40}
                    style={{ marginLeft: '16px' }}
                  />
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
                    <Link
                      className="nav-link scrollto"
                      href="/user/account/profile"
                    >
                      Thông tin
                    </Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </nav>

        {/* Biểu tượng hamburger cho menu di động */}
        <GiHamburgerMenu
          style={{ color: '#1a285a' }}
          className="mobile-nav-toggle"
          onClick={toggleNavbar}
        />
      </div>

      {/* Mobile */}
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
