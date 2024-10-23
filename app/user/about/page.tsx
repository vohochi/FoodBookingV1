import AboutHome from '@/_components/AboutHome';
import UnderNavigation from '@/_components/UnderNavigation';
import Image from 'next/image';

import React from 'react';

export const metadata = {
  title: 'About',
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
              <h2>Why Us</h2>
              <p>Why Choose Our Restaurant</p>
            </div>
            <div className="row">
              <div className="col-lg-4">
                <div className="box" data-aos="zoom-in" data-aos-delay={100}>
                  <span>01</span>
                  <h4>Lorem Ipsum</h4>
                  <p>
                    Ulamco laboris nisi ut aliquip ex ea commodo consequat. Et
                    consectetur ducimus vero placeat
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box" data-aos="zoom-in" data-aos-delay={200}>
                  <span>02</span>
                  <h4>Repellat Nihil</h4>
                  <p>
                    Dolorem est fugiat occaecati voluptate velit esse. Dicta
                    veritatis dolor quod et vel dire leno para dest
                  </p>
                </div>
              </div>
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div className="box" data-aos="zoom-in" data-aos-delay={300}>
                  <span>03</span>
                  <h4> Ad ad velit qui</h4>
                  <p>
                    Molestiae officiis omnis illo asperiores. Aut doloribus
                    vitae sunt debitis quo vel nam quis
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
              <h2>Events</h2>
              <p style={{color:'#cda45e'}}>Organize Your Events in our Restaurant</p>
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
        </section>

        {/* End Events Section */}
      </main>
      {/* End #main */}
    </>
  );
};

export default page;
