'use client';
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const TimeDate = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Khởi tạo AOS với thời gian hiệu ứng
  }, []);

  return (
    <section id="hero" className="d-flex align-items-center">
      <div
        className="container position-relative text-center text-lg-start"
        data-aos="zoom-in"
        data-aos-delay={100}
      >
        <div className="row">
          <div className="col-lg-8">
            <h1>
            Chào mừng đến với nhà hàng <span>SEPHIR&CHEESE</span>
            </h1>
            <h2>Cung cấp những món ăn tuyệt vời trong hơn 18 năm!</h2>
            <div className="btns">
              <a href="#menu" className="btn-menu animated fadeInUp scrollto">
                Đặt món ngay
              </a>
              {/* <a
                href="#book-a-table"
                className="btn-book animated fadeInUp scrollto"
              >
                Book a Table
              </a> */}
            </div>
          </div>
          <div
            className="col-lg-4 d-flex align-items-center justify-content-center position-relative"
            data-aos="zoom-in"
            data-aos-delay={200}
          >
            <a
              href="https://www.youtube.com/watch?v=GlrxcuEDyF8"
              className="glightbox play-btn"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimeDate;
