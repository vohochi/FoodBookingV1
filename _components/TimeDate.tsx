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
      >
        <div className="row">
          <div className="col-lg-8">
            <h1>
              Welcome to <span>Restaurantly</span>
            </h1>
            <h2>Delivering great food for more than 18 years!</h2>
            <div className="btns">
              <a href="#menu" className="btn-menu animated fadeInUp scrollto">
                Our Menu
              </a>
              <a
                href="#book-a-table"
                className="btn-book animated fadeInUp scrollto"
              >
                Book a Table
              </a>
            </div>
          </div>
          <div
            className="col-lg-4 d-flex align-items-center justify-content-center position-relative"
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
