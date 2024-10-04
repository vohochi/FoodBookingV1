import MenusList from '@/app/_components/MenusList';
import MenusSpecials from '@/app/_components/MenusSpecials';
import React from 'react';
const Menus = () => {
  return (
    <>
      <section id="menu" className="menu section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Menu</h2>
            <p>Check Our Tasty Menu</p>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay={100}>
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="menu-flters">
                <li data-filter="*" className="filter-active">
                  All
                </li>
                <li data-filter=".filter-starters">Starters</li>
                <li data-filter=".filter-salads">Salads</li>
                <li data-filter=".filter-specialty">Specialty</li>
              </ul>
            </div>
          </div>
          <MenusList />
        </div>
      </section>

      {/* End Menu Section */}
      {/* ======= Specials Section ======= */}
      <MenusSpecials />
    </>
  );
};

export default Menus;
