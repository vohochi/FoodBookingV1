'use client';

import MenusItem from '@/_components/MenusItem';
import { getMenus } from '@/_lib/menus';
import { Menu } from '@/types/Menu';
import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '@/_components/Spinner';
import PaginationUser from './PaginationUser';
import { RootState } from '@/store';
const MenusList = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 12;
  const { category, priceRange } = useSelector((state: RootState) => state.filter);
  const minPrice = priceRange[0] === "all" ? 0 : priceRange[0];
  const maxPrice = priceRange[1] === "all" ? 0 : priceRange[1];
  
  useEffect(() => {
    setCurrentPage(1);
  }, [category, minPrice, maxPrice]);

  useEffect(() => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }

    const fetchDishes = async () => {
      try {
        const response = await getMenus({ page: currentPage, limit, category, minPrice, maxPrice });
        setMenu(response.menuItems);
        setTotalPages(response.totalPages);
      } catch (err) {
        setError('Failed to load menus');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, [currentPage, category, minPrice, maxPrice]);


  const memoizedMenu = useMemo(() => menu, [menu]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="row menu gy-3 gx-3">
        {memoizedMenu.length === 0 ? (
          <h5 className="col-12 text-black">Các món ăn sẽ sớm được cập nhật.</h5>
        ) : (
          <>
            {memoizedMenu.map((food) => (
              <MenusItem food={food} key={food._id} />
            ))}
          </>
        )}

      </div>
      <div className='row'>
        <PaginationUser
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(event, value) => setCurrentPage(value)}
        />
      </div>
    </>
  );
};

export default MenusList;
