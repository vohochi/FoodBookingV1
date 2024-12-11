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
import { Banner } from './Banner';

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
        <Banner />
        {/* ======= Phần Đặc Biệt ======= */}
        <Bestseller />
      </main>
    </>
  );
};

export default MainHome;
