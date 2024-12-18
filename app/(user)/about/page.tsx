import AboutHome from '@/_components/AboutHome';
import UnderNavigation from '@/_components/UnderNavigation';
import '@/app/_styles/globals.css';

import React from 'react';

export const metadata = {
  title: 'About | FoodBooking', // Thêm tên website vào tiêu đề cho sự nhận diện
  description:
    'Tìm hiểu thêm về FoodBooking, sứ mệnh, giá trị và đội ngũ của chúng tôi.', // Thêm mô tả ngắn gọn, rõ ràng về trang "About"
  keywords:
    'about, FoodBooking, Thức ăn, đặt món, đặt món online, giao hàng, nhà hàng, ẩm thực, Việt Nam, FoodBooking',
  // Thêm các từ khóa liên quan đến trang "About"
};
const page = () => {
  return (
    <>
      <UnderNavigation />
      <main id="main">
        {/* ======= Contact Section ======= */}
        <AboutHome />
        {/* End Contact Section */}
        {/* ======= Why Us Section ======= */}
        <section id="why-us" className="why-us">
          <div className="container">
            <div className="section-title">
              <h2>Tại sao</h2>
              <p>Bạn nên chọn nhà hàng của chúng tôi</p>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="box">
                  <span>01</span>
                  <h4>Nguyên liệu tươi ngon</h4>
                  <p>
                    Chúng tôi cam kết sử dụng nguyên liệu sạch, tươi ngon nhất
                    từ những nguồn cung ứng đáng tin cậy. Mỗi món ăn là sự kết
                    tinh của chất lượng và tâm huyết.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box">
                  <span>02</span>
                  <h4>Không gian ấm cúng</h4>
                  <p>
                    Không chỉ là nơi thưởng thức ẩm thực, nhà hàng còn mang đến
                    không gian ấm cúng, sang trọng, lý tưởng cho các buổi hẹn
                    hò, gặp gỡ gia đình hay đối tác.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box">
                  <span>03</span>
                  <h4>Phục vụ tận tâm</h4>
                  <p>
                    Đội ngũ nhân viên chuyên nghiệp, tận tâm luôn sẵn sàng phục
                    vụ để mang đến cho bạn trải nghiệm trọn vẹn và đáng nhớ
                    nhất.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Why Us Section */}
        {/* ======= Events Section ======= */}
        {/* <section id="events" className="events">
          <div className="container">
            <div className="section-title">
              <h2>Events</h2>
              <p style={{ color: '#f0e68c' }}>
                Organize Your Events in our Restaurant
              </p>
            </div>
            <div className="events-slider swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="row event-item">
                    <div className="col-lg-6">
                      <Image
                        width={600} // Adjusted width
                        height={400} // Adjusted height
                        src="/img/event-birthday.jpg"
                        className="img-fluid"
                        alt="Birthday Parties"
                      />
                    </div>
                    <div className="col-lg-6 pt-4 pt-lg-0 content">
                      <h3>Birthday Parties</h3>
                      <div className="price">
                        <p>
                          <span>$189</span>
                        </p>
                      </div>
                      <p className="fst-italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua.
                      </p>
                      <ul>
                        <li>
                          <i className="bi bi-check-circled" /> Ullamco laboris
                          nisi ut aliquip ex ea commodo consequat.
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> Duis aute irure
                          dolor in reprehenderit in voluptate velit.
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> Ullamco laboris
                          nisi ut aliquip ex ea commodo consequat.
                        </li>
                      </ul>
                      <p>
                        Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section> */}

        {/* End Events Section */}
        {/* ======= Gallery Section ======= */}
        {/* <section id="gallery" className="gallery">
          <div className="container">
            <div className="section-title">
              <h2>Gallery</h2>
              <p>Some photos from Our Restaurant</p>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row g-0">
              {Array.from({ length: 8 }, (_, index) => (
                <div className="col-lg-3 col-md-4" key={index}>
                  <div className="gallery-item">
                    <a
                      href={`/img/gallery/gallery-${index + 1}.jpg`}
                      className="gallery-lightbox"
                      data-gall="gallery-item"
                    >
                      <Image
                        src={`/img/gallery/gallery-${index + 1}.jpg`}
                        alt={`Gallery Image ${index + 1}`}
                        className="img-fluid"
                        layout="responsive" // Sử dụng layout="responsive" để tự động điều chỉnh kích thước
                        width={500} // Kích thước width gốc (có thể thay đổi)
                        height={300} // Kích thước height gốc (có thể thay đổi)
                      />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        {/* End Gallery Section */}
        {/* ======= Chefs Section ======= */}
        {/* <section id="chefs" className="chefs">
          <div className="container">
            <div className="section-title">
              <h2>Devs</h2>
              <p>Thành viên</p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="member">
                  <Image
                    src="/img/chefs/chefs-1.jpg"
                    className="img-fluid"
                    alt="Walter White"
                    layout="responsive" // Sử dụng layout="responsive" để ảnh tự động điều chỉnh kích thước
                    width={500} // Kích thước width gốc (có thể thay đổi)
                    height={500} // Kích thước height gốc (có thể thay đổi)
                  />
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>Walter White</h4>
                      <span>Master Chef</span>
                    </div>
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="member">
                  <Image
                    src="/img/chefs/chefs-2.jpg"
                    className="img-fluid"
                    alt="Sarah Johnson"
                    layout="responsive" // Sử dụng layout="responsive"
                    width={500} // Kích thước width gốc
                    height={500} // Kích thước height gốc
                  />
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>Sarah Johnson</h4>
                      <span>Patissier</span>
                    </div>
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="member">
                  <Image
                    src="/img/chefs/chefs-3.jpg"
                    className="img-fluid"
                    alt="William Anderson"
                    layout="responsive" // Sử dụng layout="responsive"
                    width={500} // Kích thước width gốc
                    height={500} // Kích thước height gốc
                  />
                  <div className="member-info">
                    <div className="member-info-content">
                      <h4>William Anderson</h4>
                      <span>Cook</span>
                    </div>
                    <div className="social">
                      <a href="">
                        <i className="bi bi-twitter" />
                      </a>
                      <a href="">
                        <i className="bi bi-facebook" />
                      </a>
                      <a href="">
                        <i className="bi bi-instagram" />
                      </a>
                      <a href="">
                        <i className="bi bi-linkedin" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* End Chefs Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default page;
