import MenusItem from '@/app/_components/MenusItem';
import Spinner from '@/app/_components/Spinner';
import { Suspense } from 'react';

const MenusList = () => {
  return (
    <div className="row menu-container" data-aos="fade-up" data-aos-delay={200}>
      <Suspense fallback={<Spinner />}>
        <MenusItem />
      </Suspense>
    </div>
  );
};

export default MenusList;
