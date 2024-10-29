import Spinner from '@/_components/Spinner';
import MenusList from '@/_components/MenusList';
import React, { Suspense } from 'react';
import Categories from './Categories';

const MenuHome = () => {
  return (
    <>
      <section id="menu" className="menu section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Menu</h2>
            <p>Check Our Tasty Menu</p>
          </div>
          <div className="row">
            <Categories />
          </div>
          <Suspense fallback={<Spinner />}>
            <MenusList />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default MenuHome;
