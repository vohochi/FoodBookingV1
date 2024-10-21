import Link from 'next/link';
import Image from 'next/image';
import avatar from '@/public/about-2.jpg'; // Thay đổi đường dẫn đến avatar của bạn

// import SearchBar from '@/app/_components/SearchBar';

export default async function Navigation() {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
        <h1 className="logo me-auto me-lg-0">
          <a href="/user">Tasteful's Bounty</a>
        </h1>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="dropdown active">
              <Link href="/user">
                <span>Trang chủ</span> <i className="bi bi-chevron-down" />
              </Link>
              <ul>
                <li>
                  <Link className="nav-link scrollto" href="/user/menus">
                    Thực đơn
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/about">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/specials">
                    Đặc biệt
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/events">
                    Sự kiện
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/chefs">
                    Đầu bếp
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/gallery">
                    Phòng trưng bày
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/contact">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="nav-link scrollto" href="/user/menus">
                Thực đơn
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="/user/cart">
                Giỏ hàng
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="/user/about">
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="/user/contact">
                Liên hệ
              </Link>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle" />
        </nav>

        {/* Thêm thanh tìm kiếm và avatar vào đây */}
        {/* <SearchBar /> */}
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="dropdown active">
              <Link
                href="/user/account/profile"
                className="d-flex align-items-center"
              >
                <Image
                  src={avatar}
                  alt="avatar"
                  className="rounded-circle"
                  width={40}
                  height={40}
                  style={{ marginLeft: '16px' }} // Khoảng cách giữa avatar và thanh tìm kiếm
                />
              </Link>
              <ul>
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
                <li>
                  <Link className="nav-link scrollto" href="/user/account/profile">
                    Thông tin
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

        </nav >



        <Link
          href="/bookTable"
          className="book-a-table-btn scrollto d-none d-lg-flex"
        >
          Book a table
        </Link>
      </div>
    </header>
  );
}
