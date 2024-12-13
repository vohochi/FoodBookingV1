const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="footer-info">
                <h3>Sephir&Cheese</h3>
                <p>
                  Công viên phần mềm Quang Trung,
                  <br />
                  P. Tân Chánh Hiệp, Q.12, TP.HCM
                  <br />
                  <br />
                  <strong>Phone:</strong> +84 899 924 244
                  <br />
                  <strong>Email:</strong> nam232004@gmail.com
                  <br />
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="facebook">
                    <i className="bx bxl-facebook" />
                  </a>
                  <a href="#" className="instagram">
                    <i className="bx bxl-instagram" />
                  </a>
                  <a href="#" className="google-plus">
                    <i className="bx bxl-skype" />
                  </a>
                  <a href="#" className="linkedin">
                    <i className="bx bxl-linkedin" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Liên kết hữu ích</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/">Trang chủ</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/menus">Thực đơn</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/about">Về chúng tôi</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/contact">Liên hệ</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4 style={{ color: '#1a285a' }}>_</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/wishlist">Yêu thích</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/cart">Giỏ hàng</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/account/profile">Thông tin người dùng</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/auth/login">Đăng nhập</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4 style={{ color: '#1a285a' }}>_</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/menus">Đặt món</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/contact">Hỗ trợ</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/contact">Liên hệ</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="/auth/register">Tạo tài khoản</a>
                </li>
              </ul>
            </div>
            {/* <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Đăng ký để cập nhật tin tức nhanh nhất</h4>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
