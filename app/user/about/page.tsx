import AboutHome from "@/_components/AboutHome";
import UnderNavigation from "@/_components/UnderNavigation";
import Image from "next/image";

import React from "react";

export const metadata = {
  title: "About",
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
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Tại sao là chúng tôi</h2>
              <p>Tại sao nên lựa chọn nhà hàng chúng tôi</p>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="box" data-aos="zoom-in" data-aos-delay={100}>
                  <span>01</span>
                  <h4>Chất lượng tuyệt hảo</h4>
                  <p>
                    Chúng tôi sử dụng những nguyên liệu tốt nhất, kết hợp với
                    tay nghề của các đầu bếp hàng đầu để mang lại hương vị khó
                    quên.<br></br>
                    Dịch vụ tận tâm, không chỉ làm hài lòng vị giác mà còn chạm
                    đến cảm xúc của bạn.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box" data-aos="zoom-in" data-aos-delay={200}>
                  <span>02</span>
                  <h4>Môi trường thân thiện</h4>
                  <p>
                    Không gian nhà hàng được thiết kế tinh tế, ấm cúng, phù hợp
                    cho mọi dịp từ họp mặt gia đình, hẹn hò cho đến các buổi gặp
                    gỡ công việc.<br></br>
                    Nhân viên nhiệt tình, chu đáo, luôn sẵn sàng phục vụ.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box" data-aos="zoom-in" data-aos-delay={300}>
                  <span>03</span>
                  <h4>Giá cả hợp lý</h4>
                  <p>
                    Chúng tôi mang đến cho bạn trải nghiệm ẩm thực đẳng cấp mà
                    không cần phải lo lắng về giá cả.<br></br>
                    Chất lượng và dịch vụ của chúng tôi luôn đáng giá từng đồng
                    bạn bỏ ra.<br></br>
                    Lựa chọn chúng tôi là quyết định đúng đắn nhất
                    <p></p>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Why Us Section */}
        {/* ======= Events Section ======= */}
        <section id="events" className="events">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Sự kiện</h2>
              <p style={{ color: "#cda45e" }}>
                Tổ chức các sự kiện của bạn tại nhà hàng của chúng tôi
              </p>
            </div>
            <div
              className="events-slider swiper-container"
              data-aos="fade-up"
              data-aos-delay={100}
            >
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
                      <h3>Tiệc sinh nhật</h3>
                      {/* <div className="price">
                        <p>
                          <span>$189</span>
                        </p>
                      </div> */}
                      <p className="fst-italic">
                        Hãy tổ chức một bữa tiệc sinh nhật đáng nhớ tại nhà hàng
                        của chúng tôi! Với không gian sang trọng, dịch vụ chuyên
                        nghiệp và thực đơn đa dạng, chúng tôi sẽ giúp bạn tạo
                        nên một bữa tiệc hoàn hảo cho những người thân yêu.
                      </p>
                      <ul>
                        <li>
                          <i className="bi bi-check-circled" /> - Không gian tổ
                          chức riêng biệt
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> - Bàn tiệc trang
                          trí đẹp mắt
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> - Thực đơn đa
                          dạng phù hợp với mọi khẩu vị
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> - Dịch vụ phục
                          vụ chuyên nghiệp
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> - Hệ thống âm
                          thanh, ánh sáng hiện đại
                        </li>
                      </ul>
                      <p>
                        Liên hệ với chúng tôi ngay hôm nay để đặt chỗ và nhận ưu
                        đãi đặc biệt!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section>

        {/* End Events Section */}
        {/* ======= Gallery Section ======= */}
        <section id="gallery" className="gallery">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Phòng trưng bày</h2>
              <p>Một số hình ảnh từ nhà hàng chúng tôi</p>
            </div>
          </div>
          <div
            className="container-fluid"
            data-aos="fade-up"
            data-aos-delay={100}
          >
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
        </section>

        {/* End Gallery Section */}
        {/* ======= Chefs Section ======= */}
        <section id="chefs" className="chefs">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Đầu bếp</h2>
              <p>Bếp trưởng của chúng tôi</p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="member" data-aos="zoom-in" data-aos-delay={100}>
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
                      {/* <span>Master Chef</span> */}
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
                <div className="member" data-aos="zoom-in" data-aos-delay={200}>
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
                      {/* <span>Patissier</span> */}
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
                <div className="member" data-aos="zoom-in" data-aos-delay={300}>
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
                      {/* <span>Cook</span> */}
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
        </section>

        {/* End Chefs Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default page;
