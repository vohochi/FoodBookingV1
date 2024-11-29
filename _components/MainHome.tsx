'use client';

import React, { useEffect } from 'react';
import Swiper from 'swiper'; // Nhập Swiper
import AOS from 'aos'; // Nhập AOS
import 'aos/dist/aos.css'; // Nhập CSS AOS
import 'swiper/swiper-bundle.css'; // Nhập CSS Swiper

import TimeDate from '@/_components/TimeDate';
import MenuHome from '@/_components/MenuHome';
import GoToCartButton from './GoToCartButton';
import Bestseller from './Bestseller';
import {Banner} from './Banner';

const MainHome = () => {
  useEffect(() => {
    new Swiper('.testimonials-slider', {
      speed: 600,
      loop: true,
      autoplay: {
        delay: 100,
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

    // Khởi tạo AOS
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  return (
    <>
      <GoToCartButton />
      <TimeDate />
      <main id="main">
        {/* ======= Phần Menu ======= */}
        <MenuHome />
        {/* Kết thúc Phần Menu */}
        <Banner/>
        {/* ======= Phần Đặc Biệt ======= */}
        <Bestseller />

        {/* Kết thúc Phần Đặc Biệt */}
        {/* ======= Phần Đánh Giá ======= */}
        {/* <section id="testimonials" className="testimonials section-bg">
          <div className="container">
            <div className="section-title">
              <h2>Đánh Giá</h2>
              <p>Họ đang nói gì về chúng tôi</p>
            </div>
            <div className="testimonials-slider swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Proin iaculis purus consequat sem cure digni ssim donec
                      porttitora entum suscipit rhoncus. Accusantium quam,
                      ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                      risus at semper.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <Image
                      width={90} // Chiều rộng được điều chỉnh cho phù hợp với CSS
                      height={90} // Chiều cao được điều chỉnh cho phù hợp với CSS
                      src="/img/testimonials/testimonials-1.jpg"
                      className="testimonial-img"
                      alt="Saul Goodman"
                    />
                    <h3>Saul Goodman</h3>
                    <h4>Giám Đốc &amp; Nhà Sáng Lập</h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Export tempor illum tamen malis malis eram quae irure esse
                      labore quem cillum quid cillum eram malis quorum velit
                      fore eram velit sunt aliqua noster fugiat irure amet legam
                      anim culpa.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <Image
                      width={90} // Chiều rộng được điều chỉnh cho phù hợp với CSS
                      height={90} // Chiều cao được điều chỉnh cho phù hợp với CSS
                      src="/img/testimonials/testimonials-2.jpg"
                      className="testimonial-img"
                      alt="Sara Wilsson"
                    />
                    <h3>Sara Wilsson</h3>
                    <h4>Nhà Thiết Kế</h4>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Enim nisi quem export duis labore cillum quae magna enim
                      sint quorum nulla quem veniam duis minim tempor labore
                      quem eram duis noster aute amet eram fore quis sint minim.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <Image
                      width={90} // Chiều rộng được điều chỉnh cho phù hợp với CSS
                      height={90} // Chiều cao được điều chỉnh cho phù hợp với CSS
                      src="/img/testimonials/testimonials-3.jpg"
                      className="testimonial-img"
                      alt="Jena Karlis"
                    />
                    <h3>Jena Karlis</h3>
                    <h4>Chủ Cửa Hàng</h4>
                  </div>
                </div>
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
                      width={90} // Chiều rộng được điều chỉnh cho phù hợp với CSS
                      height={90} // Chiều cao được điều chỉnh cho phù hợp với CSS
                      src="/img/testimonials/testimonials-4.jpg"
                      className="testimonial-img"
                      alt="Matt Brandon"
                    />
                    <h3>Matt Brandon</h3>
                    <h4>Freelancer</h4>
                  </div>
                </div>
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
                      width={90} // Chiều rộng được điều chỉnh cho phù hợp với CSS
                      height={90} // Chiều cao được điều chỉnh cho phù hợp với CSS
                      src="/img/testimonials/testimonials-5.jpg"
                      className="testimonial-img"
                      alt="John Larson"
                    />
                    <h3>John Larson</h3>
                    <h4>Doanh Nhân</h4>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section> */}

        {/* Kết thúc Phần Đánh Giá */}
      </main>
    </>
  );
};

export default MainHome;
