import MenusList from '@/_components/MenusList';
import Spinner from '@/_components/Spinner';
import React, { Suspense } from 'react';
import GoToCartButton from './GoToCartButton';
import MenuLeftSidebar from './MenuLeftSide';
import BestsellerList from './Bestseller';
import SelectFilter from './selectFilter';

const Menus = () => {
  return (
    <>
      <GoToCartButton />
      <section id="menu" className="menu section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Menu</h2>
            <p>Check Our Tasty Menu</p>
          </div>
          <div className='row gy-3 gx-4'>
            <div className='col-lg-3 col-md-12 col-sm-12'>
              <MenuLeftSidebar />
            </div>
            <div className='col-lg-9 col-md-12 col-sm-12 position-relative'>
              <SelectFilter />
              <Suspense fallback={<Spinner />}>
                <MenusList />
              </Suspense>
            </div>

          </div>
        </div>
      </section>

      {/* End Menu Section */}
      {/* ======= Specials Section ======= */}
      <BestsellerList />
    </>
  );
};

export default Menus;
