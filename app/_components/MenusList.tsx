import MenusItem from '@/app/_components/MenusItem';
import Spinner from '@/app/_components/Spinner';
import { getDishes } from '@/app/_lib/dishes';
import { Suspense } from 'react';

const MenusList = async () => {
  const { dishes } = await getDishes();

  return (
    <div className="row menu-container" data-aos="fade-up" data-aos-delay={200}>
      <Suspense fallback={<Spinner />}>
        {dishes.map((food) => (
          <MenusItem food={food} key={food._id} />
        ))}
      </Suspense>
    </div>
  );
};

export default MenusList;
