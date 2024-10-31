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
      <div className="container position-relative text-center text-lg-start">
        <div className="row">
          <div className="col-lg-8">
            <h1>
              Chào mừng bạn đến <span>Nhà hàng</span>
            </h1>
            <h2>Cung cấp thực phẩm tuyệt vời trong hơn 18 năm!</h2>
            <div className="btns">
              <a href="#menu" className="btn-menu animated fadeInUp scrollto">
                Thực đơn của chúng tôi
              </a>
              <a
                href="#book-a-table"
                className="btn-book animated fadeInUp scrollto"
              >
                Đặt một cái bàn{' '}
              </a>
            </div>
          </div>
          <div className="col-lg-4 d-flex align-items-center justify-content-center position-relative">
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
