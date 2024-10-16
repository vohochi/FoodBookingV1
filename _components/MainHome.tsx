'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Swiper from 'swiper'; // Import Swiper
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import 'swiper/swiper-bundle.css'; // Import Swiper CSS

import TimeDate from '@/_components/TimeDate';
import MenuHome from '@/_components/MenuHome';
import BookTableHome from '@/_components/BookTableHome';
import AboutHome from '@/_components/AboutHome';

const MainHome = () => {
  useEffect(() => {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },

        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });

    // Initialize AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);
  return (
    <>
      <TimeDate />
      <main id="main">
        {/* ======= About Section ======= */}
        <AboutHome />

        {/* End About Section */}
        {/* ======= Why Us Section ======= */}
        <section id="why-us" className="why-us">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Tại sao là chúng tôi</h2>
              <p>Tại sao chọn nhà hàng của chúng tôi?</p>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="box" data-aos="zoom-in" data-aos-delay={100}>
                  <span>01</span>
                  <h4>Chất lượng tuyệt hảo</h4>
                  <p>
                  Chúng tôi sử dụng những nguyên liệu tốt nhất, kết hợp với tay nghề của các đầu bếp hàng đầu để mang lại hương vị khó quên.<br></br>
                  Dịch vụ tận tâm, không chỉ làm hài lòng vị giác mà còn chạm đến cảm xúc của bạn.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box" data-aos="zoom-in" data-aos-delay={200}>
                  <span>02</span>
                  <h4>Môi trường thân thiện</h4>
                  <p>
                  Không gian nhà hàng được thiết kế tinh tế, ấm cúng, phù hợp cho mọi dịp từ họp mặt gia đình, hẹn hò cho đến các buổi gặp gỡ công việc.<br></br>
                  Nhân viên nhiệt tình, chu đáo, luôn sẵn sàng phục vụ.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box" data-aos="zoom-in" data-aos-delay={300}>
                  <span>03</span>
                  <h4>Giá cả hợp lý</h4>
                  <p>
                  Chúng tôi mang đến cho bạn trải nghiệm ẩm thực đẳng cấp mà không cần phải lo lắng về giá cả.<br></br>
                  Chất lượng và dịch vụ của chúng tôi luôn đáng giá từng đồng bạn bỏ ra.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Why Us Section */}
        {/* ======= Menu Section ======= */}
        <MenuHome />
        {/* End Menu Section */}
        {/* ======= Specials Section ======= */}
        <section id="specials" className="specials">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Đặc biệt</h2>
              <p>Đặc biệt của chúng tôi</p>
            </div>
            <div className="row" data-aos="fade-up" data-aos-delay={100}>
              <div className="col-lg-3">
                <ul className="nav nav-tabs flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link active show"
                      data-bs-toggle="tab"
                      href="#tab-1"
                    >
                      Khai vị
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-2">
                    Món chính
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-3">
                    Tráng miệng
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-4">
                    Nước ép
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" href="#tab-5">
                    Đặc sản
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-9 mt-4 mt-lg-0">
                <div className="tab-content">
                  <div className="tab-pane active show" id="tab-1">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Gỏi cuốn</h3>
                        <p className="fst-italic">
                          Món ăn được ưa thích nhất tại nhà hàng
                        </p>
                        <p>
                        Gỏi cuốn tươi mát kết hợp giữa tôm, thịt heo, rau sống và bánh tráng, chấm cùng nước mắm chua ngọt, mang lại sự khởi đầu nhẹ nhàng và thanh mát.
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <Image
                          width={100} // Increased size
                          height={100} // Increased size
                          src="/img/specials-1.png"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-2">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>Et blanditiis nemo veritatis excepturi</h3>
                        <p className="fst-italic">
                          Qui laudantium consequatur laborum sit qui ad sapiente
                          dila parde sonata raqer a videna mareta paulona marka
                        </p>
                        <p>
                          Ea ipsum voluptatem consequatur quis est. Illum error
                          ullam omnis quia et reiciendis sunt sunt est. Non
                          aliquid repellendus itaque accusamus eius et velit
                          ipsa voluptates. Optio nesciunt eaque beatae accusamus
                          lerode pakto madirna desera vafle de nideran pal
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <Image
                          width={100} // Increased size
                          height={100} // Increased size
                          src="/img/specials-2.png"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-3">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Impedit facilis occaecati odio neque aperiam sit
                        </h3>
                        <p className="fst-italic">
                          Eos voluptatibus quo. Odio similique illum id quidem
                          non enim fuga. Qui natus non sunt dicta dolor et. In
                          asperiores velit quaerat perferendis aut
                        </p>
                        <p>
                          Iure officiis odit rerum. Harum sequi eum illum
                          corrupti culpa veritatis quisquam. Neque
                          necessitatibus illo rerum eum ut. Commodi ipsam minima
                          molestiae sed laboriosam a iste odio. Earum odit
                          nesciunt fugiat sit ullam. Soluta et harum voluptatem
                          optio quae
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <Image
                          width={100} // Increased size
                          height={100} // Increased size
                          src="/img/specials-3.png"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-4">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Fuga dolores inventore laboriosam ut est accusamus
                          laboriosam dolore
                        </h3>
                        <p className="fst-italic">
                          Totam aperiam accusamus. Repellat consequuntur iure
                          voluptas iure porro quis delectus
                        </p>
                        <p>
                          Eaque consequuntur consequuntur libero expedita in
                          voluptas. Nostrum ipsam necessitatibus aliquam fugiat
                          debitis quis velit. Eum ex maxime error in consequatur
                          corporis atque. Eligendi asperiores sed qui veritatis
                          aperiam quia a laborum inventore
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <Image
                          width={100} // Increased size
                          height={100} // Increased size
                          src="/img/specials-4.png"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="tab-pane" id="tab-5">
                    <div className="row">
                      <div className="col-lg-8 details order-2 order-lg-1">
                        <h3>
                          Est eveniet ipsam sindera pad rone matrelat sando reda
                        </h3>
                        <p className="fst-italic">
                          Omnis blanditiis saepe eos autem qui sunt debitis
                          porro quia.
                        </p>
                        <p>
                          Exercitationem nostrum omnis. Ut reiciendis
                          repudiandae minus. Omnis recusandae ut non quam ut
                          quod eius qui. Ipsum quia odit vero atque qui
                          quibusdam amet. Occaecati sed est sint aut vitae
                          molestiae voluptate vel
                        </p>
                      </div>
                      <div className="col-lg-4 text-center order-1 order-lg-2">
                        <Image
                          width={100} // Increased size
                          height={100} // Increased size
                          src="/img/specials-5.png"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* End Specials Section */}
        {/* ======= Events Section ======= */}
        <section id="events" className="events">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Sự kiện</h2>
              <p>Tổ chức các sự kiện của bạn tại nhà hàng của chúng tôi</p>
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
                          <span></span>
                        </p>
                      </div> */}
                      <p className="fst-italic">
                      Hãy tổ chức một bữa tiệc sinh nhật đáng nhớ tại nhà hàng của chúng tôi! Với không gian sang trọng, dịch vụ chuyên nghiệp và thực đơn đa dạng, chúng tôi sẽ giúp bạn tạo nên một bữa tiệc hoàn hảo cho những người thân yêu.
                      </p>
                      <ul>
                        <li>
                          <i className="bi bi-check-circled" /> - Không gian tổ chức riêng biệt
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> - Bàn tiệc trang trí đẹp mắt
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> - Thực đơn đa dạng phù hợp với mọi khẩu vị
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> - Dịch vụ phục vụ chuyên nghiệp
                        </li>
                        <li>
                          <i className="bi bi-check-circled" /> - Hệ thống âm thanh, ánh sáng hiện đại
                        </li>
                      </ul>
                      <p>
                      Liên hệ với chúng tôi ngay hôm nay để đặt chỗ và nhận ưu đãi đặc biệt!
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
        {/* ======= Book A Table Section ======= */}
        <BookTableHome />
        {/* End Book A Table Section */}
        {/* ======= Testimonials Section ======= */}
        <section id="testimonials" className="testimonials section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Lời chứng thực</h2>
              <p>Những gì họ nói về chúng tôi</p>
            </div>
            <div
              className="testimonials-slider swiper-container"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Tôi rất ấn tượng với sự đa dạng của thực đơn tại nhà hàng. Món gỏi cuốn thật sự độc đáo và hấp dẫn. 
                      Nhân viên phục vụ rất chu đáo và thân thiện. Tôi rất hài lòng với bữa ăn của mình.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <Image
                      width={90} // Adjusted width to match CSS
                      height={90} // Adjusted height to match CSS
                      src="/img/testimonials/testimonials-1.jpg"
                      className="testimonial-img"
                      alt="Saul Goodman"
                    />
                    <h3>Saul Goodman</h3>
                    <h4>Khách hàng</h4>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Tôi đã có một bữa tối tuyệt vời tại nhà hàng. Các món nướng rất ngon và được trình bày đẹp mắt. 
                      Không gian nhà hàng ấm cúng và lãng mạn. 
                      Tôi rất thích trải nghiệm tại đây.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <Image
                      width={90} // Adjusted width to match CSS
                      height={90} // Adjusted height to match CSS
                      src="/img/testimonials/testimonials-2.jpg"
                      className="testimonial-img"
                      alt="Sara Wilsson"
                    />
                    <h3>Sara Wilsson</h3>
                    <h4>Khách hàng</h4>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Nhà hàng này thực sự là một điểm đến lý tưởng cho những ai muốn thưởng thức ẩm thực đặc sắc và đa dạng tại nhà hàng này. 
                      Món pasta hải sản là món tôi yêu thích nhất. 
                      Không gian đẹp, dịch vụ tốt, tôi chắc chắn sẽ quay lại đây.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <Image
                      width={90} // Adjusted width to match CSS
                      height={90} // Adjusted height to match CSS
                      src="/img/testimonials/testimonials-3.jpg"
                      className="testimonial-img"
                      alt="Jena Karlis"
                    />
                    <h3>Jena Karlis</h3>
                    <h4>Khách hàng</h4>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Fugiat enim eram quae cillum dolore dolor amet nulla culpa
                      multos export minim fugiat minim velit minim dolor enim
                      duis veniam ipsum anim magna sunt elit fore quem dolore
                      labore illum veniam.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <Image
                      width={90} // Adjusted width to match CSS
                      height={90} // Adjusted height to match CSS
                      src="/img/testimonials/testimonials-4.jpg"
                      className="testimonial-img"
                      alt="Matt Brandon"
                    />
                    <h3>Matt Brandon</h3>
                    <h4>Freelancer</h4>
                  </div>
                </div>
                {/* End testimonial item */}
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Quis quorum aliqua sint quem legam fore sunt eram irure
                      aliqua veniam tempor noster veniam enim culpa labore duis
                      sunt culpa nulla illum cillum fugiat legam esse veniam
                      culpa fore nisi cillum quid.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <Image
                      width={90} // Adjusted width to match CSS
                      height={90} // Adjusted height to match CSS
                      src="/img/testimonials/testimonials-5.jpg"
                      className="testimonial-img"
                      alt="John Larson"
                    />
                    <h3>John Larson</h3>
                    <h4>Entrepreneur</h4>
                  </div>
                </div>
                {/* End testimonial item */}
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section>

        {/* End Testimonials Section */}
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
              <p>Những đầu bếp chuyên nghiệp của chúng tôi</p>
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
        </section>

        {/* End Chefs Section */}
        {/* ======= Contact Section ======= */}
        <section id="contact" className="contact">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Liên hệ</h2>
              <p>Liên hệ chúng tôi</p>
            </div>
          </div>
          <div data-aos="fade-up">
            <iframe
              style={{ border: 0, width: '100%', height: 350 }}
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
              frameBorder={0}
              // allowFullScreen=""
            />
          </div>
          <div className="container" data-aos="fade-up">
            <div className="row mt-5">
              <div className="col-lg-4">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt" />
                    <h4>Vị trí:</h4>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                  <div className="open-hours">
                    <i className="bi bi-clock" />
                    <h4>Giờ mở cửa:</h4>
                    <p>
                      Thứ Hai - Thứ Bảy:
                      <br />
                      11:00 AM - 2300 PM
                    </p>
                  </div>
                  <div className="email">
                    <i className="bi bi-envelope" />
                    <h4>Email:</h4>
                    <p>info@example.com</p>
                  </div>
                  <div className="phone">
                    <i className="bi bi-phone" />
                    <h4>Gọi:</h4>
                    <p>+1 5589 55488 55s</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mt-5 mt-lg-0">
                <form
                  action="forms/contact.php"
                  method="post"
                  role="form"
                  className="php-email-form"
                >
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Tên của bạn"
                      />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Email của bạn"
                      />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input
                      type="text"
                      className="form-control"
                      name="subject"
                      id="subject"
                      placeholder="Chủ đề"
                    />
                  </div>
                  <div className="form-group mt-3">
                    <textarea
                      className="form-control"
                      name="message"
                      rows={8}
                      placeholder="Tin nhắn"
                      defaultValue={''}
                    />
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message" />
                    <div className="sent-message">
                    Tin nhắn của bạn đã được gửi. Cảm ơn bạn!
                    </div>
                  </div>
                  <div className="text-center">
                    <button type="submit">Gửi tin nhắn</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* End Contact Section */}
      </main>
    </>
  );
};

export default MainHome;
