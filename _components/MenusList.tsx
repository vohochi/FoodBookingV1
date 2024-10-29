'use client';

import MenusItem from '@/_components/MenusItem';
import { getDishes } from '@/_lib/dishes';
import { Menu } from '@/types/Menu';
import { useMemo, useState, useEffect } from 'react';

const MenusList = () => {
  const [menu, setMenu] = useState<Menu[]>([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const response = await getDishes();
      setMenu(response);
    };
    fetchDishes();
  }, []);

  const memoizedMenu = useMemo(() => menu, [menu]);

  return (
    <div className="row menu-container">
      {memoizedMenu.map((food) => (
        <MenusItem food={food} key={food._id} />
      ))}
    </div>
  );
};

export default MenusList;
