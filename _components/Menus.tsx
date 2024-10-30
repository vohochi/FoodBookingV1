import MenusList from '@/_components/MenusList';
import MenusSpecials from '@/_components/MenusSpecials';
import Spinner from '@/_components/Spinner';
import React, { Suspense } from 'react';
import GoToCartButton from './GoToCartButton';
import MenuLeftSidebar from './MenuLeftSide';

const Menus = () => {
  return (
    <>
      <GoToCartButton />
      <section id="menu" className="menu section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Menu</h2>
            <p> Menu ngon của chúng tôi</p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <MenuLeftSidebar />
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
              <Suspense fallback={<Spinner />}>
                <MenusList />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* End Menu Section */}
      {/* ======= Specials Section ======= */}
      <MenusSpecials />
    </>
  );
};

export default Menus;
