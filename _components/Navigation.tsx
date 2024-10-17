import Link from 'next/link';
import Image from 'next/image';
import avatar from '@/public/about-2.jpg'; // Thay đổi đường dẫn đến avatar của bạn
// import SearchBar from '@/app/_components/SearchBar';

export default async function Navigation() {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container-fluid container-xl d-flex align-items-center justify-content-lg-between">
        <h1 className="logo me-auto me-lg-0">
          <a href="/user">Restaurantly</a>
        </h1>

        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li className="dropdown active">
              <Link href="/user">
                <span>Home</span> <i className="bi bi-chevron-down" />
              </Link>
              <ul>
                <li>
                  <Link className="nav-link scrollto" href="/user/menus">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/specials">
                    Specials
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/events">
                    Events
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/chefs">
                    Chefs
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/gallery">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link className="nav-link scrollto" href="/user/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link className="nav-link scrollto" href="/user/menus">
                Menu
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="/user/cart">
                Cart
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="/user/about">
                About
              </Link>
            </li>
            <li>
              <Link className="nav-link scrollto" href="/user/contact">
                Contact
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
