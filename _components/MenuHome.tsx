import { Suspense, lazy } from 'react';
import Spinner from '@/_components/Spinner';

// Lazy load MenusList
const MenusList = lazy(() => import('@/_components/MenusList'));

const MenuHome = () => {
  return (
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
        <div
          className="row menu-container"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          <Suspense fallback={<Spinner />}>
            <MenusList />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default MenuHome;
