import MenusList from '@/_components/MenusList';
import Spinner from '@/_components/Spinner';
import React, { Suspense } from 'react';
const RelatedFood = () => {
  return (
    <>
      <section id="menu" className="menu bg-transparent">
        <div className="container">
          <div className="section-title">
            <h2>Sản phẩm tương tự</h2>
          </div>
          
          <Suspense fallback={<Spinner />}>
            <MenusList />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default RelatedFood;
