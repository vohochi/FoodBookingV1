import Spinner from '@/_components/Spinner';
import React, { Suspense } from 'react';
import MenusListRelated from './MenusListRelated';

interface RelatedFoodProps {
  category: string;
}

const RelatedFood: React.FC<RelatedFoodProps> = ({ category }) => {
  return (
    <>
      <section className="menu bg-transparent">
        <div className="container">
          <div className="section-title">
            <h2>Sản phẩm tương tự</h2>
          </div>

          <Suspense fallback={<Spinner />}>
            <MenusListRelated category={category} />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default RelatedFood;
