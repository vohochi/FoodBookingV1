import Link from 'next/link';
import Image from 'next/image';
import avatar from '@/public/about-2.jpg';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaUser } from 'react-icons/fa6';

export default async function Navigation() {
  let isLoggedIn = true;
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
        <h1 className="logo me-auto me-lg-0">
          <a href="/user">Tasteful's Bounty</a>
        </h1>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
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
              <Link className="nav-link" href="/user/cart">
                Giỏ hàng
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
            <li>
              <Link className="nav-link" href="/user/wishlist">
                Yêu thích
              </Link>
            </li>
          </ul>
          <GiHamburgerMenu className="mobile-nav-toggle" />
        </nav>

        {/* Thêm thanh tìm kiếm và avatar vào đây */}
        {/* <SearchBar /> */}
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="dropdown active">
              <Link href="/user/account/profile" className="d-flex align-items-center">
                {!isLoggedIn ? (
                  <>
                    <FaUser />
                  </>
                ) : (
                  <>
                    <Image
                      src={avatar}
                      alt="avatar"
                      className="rounded-circle"
                      width={40}
                      height={40}
                      style={{ marginLeft: '16px' }}
                    />
                  </>
                )}
              </Link>
              <ul>
                {!isLoggedIn ? (
                  <>
                    <li>
                      <Link className="nav-link scrollto" href="/authentication/login">
                        Đăng nhập
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link scrollto" href="/authentication/register">
                        Đăng ký
                      </Link>
                    </li>
                  </>
                ) : (
                  <li>
                    <Link className="nav-link scrollto" href="/authentication/logout">
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
      </div>
    </header>
  );
}
