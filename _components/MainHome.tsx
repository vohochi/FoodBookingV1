'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Swiper from 'swiper'; // Import Swiper
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS CSS
import 'swiper/swiper-bundle.css'; // Import Swiper CSS

import TimeDate from '@/_components/TimeDate';
import MenuHome from '@/_components/MenuHome';
import GoToCartButton from './GoToCartButton';
import Contact from './Contact';
import Bestseller from './Bestseller';

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
      <GoToCartButton/>
      <TimeDate />
      <main id="main">
        
        {/* ======= Menu Section ======= */}
        <MenuHome />
        {/* End Menu Section */}
        {/* ======= Specials Section ======= */}
        <Bestseller/>

        {/* End Specials Section */}
        {/* ======= Testimonials Section ======= */}
        <section id="testimonials" className="testimonials section-bg">
          <div className="container" data-aos="fade-up">
            <div className="section-title">
              <h2>Testimonials</h2>
              <p>What they&apos;re saying about us</p>
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
                      Proin iaculis purus consequat sem cure digni ssim donec
                      porttitora entum suscipit rhoncus. Accusantium quam,
                      ultricies eget id, aliquam eget nibh et. Maecen aliquam,
                      risus at semper.
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
                    <h4>Ceo &amp; Founder</h4>
                  </div>
                </div>
                {/* End testimonial item */}
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
                      width={90} // Adjusted width to match CSS
                      height={90} // Adjusted height to match CSS
                      src="/img/testimonials/testimonials-2.jpg"
                      className="testimonial-img"
                      alt="Sara Wilsson"
                    />
                    <h3>Sara Wilsson</h3>
                    <h4>Designer</h4>
                  </div>
                </div>
                {/* End testimonial item */}
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
                      width={90} // Adjusted width to match CSS
                      height={90} // Adjusted height to match CSS
                      src="/img/testimonials/testimonials-3.jpg"
                      className="testimonial-img"
                      alt="Jena Karlis"
                    />
                    <h3>Jena Karlis</h3>
                    <h4>Store Owner</h4>
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
      </main>
    </>
  );
};

export default MainHome;
