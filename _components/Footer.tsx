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
                  <strong>Phone:</strong> +84 986 555 568
                  <br />
                  <strong>Email:</strong> saphircheese@example.com
                  <br />
                </p>
                <div className="social-links mt-3">
                  <a href="#" className="twitter">
                    <i className="bx bxl-twitter" />
                  </a>
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
            <div className="col-lg-2 col-md-6 footer-links">
              <h4>Liên kết hữu ích</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="#">Trang chủ</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Thực đơn</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="#">Về chúng tôi</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="#">Điều khoản bảo mật</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" />{' '}
                  <a href="#">Chính sách bảo mật</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 footer-links">
              <h4>Dịch vụ của chúng tôi</h4>
              <ul>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Đặt món</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Hỗ trợ</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Tiếp thị</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Sự kiện</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right" /> <a href="#">Liên hệ</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-6 footer-newsletter">
              <h4>Bản tin của chúng tôi</h4>
              <p>
                Đăng ký để cập nhật tin tức nhanh nhất
              </p>
              <form action="" method="post">
                <input type="email" name="email" style={{ outline: 'none' }} />
                <input type="submit" defaultValue="Đăng ký" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
