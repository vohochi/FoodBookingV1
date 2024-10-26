import Spinner from '@/_components/Spinner';
import MenusList from '@/_components/MenusList';
import React, { Suspense } from 'react';
import Categories from './Categories';

const MenuHome = () => {
  return (
    <section id="menu" className="menu section-bg">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Thực đơn</h2>
          <p>Thực đơn của chúng tôi</p>
        </div>
        <div className="row" data-aos="fade-up" data-aos-delay={100}>
          <Categories/>
        </div>
        <Suspense fallback={<Spinner />}>
          <MenusList />
        </Suspense>
      </div>
    </section>
  );
};

export default MenuHome;
