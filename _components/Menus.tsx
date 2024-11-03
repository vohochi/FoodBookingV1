'use client'

import MenusItem from '@/_components/MenusItem';
import { getMenus } from '@/_lib/menus';
import { Menu } from '@/types/Menu';
import { useMemo, useState, useEffect } from 'react';
import Spinner from '@/_components/Spinner';
import GoToCartButton from './GoToCartButton';
import MenuLeftSidebar from './MenuLeftSide';
import BestsellerList from './Bestseller';
import SelectFilter from './selectFilter';
import PaginationUser from './PaginationUser';
import { useSelector } from 'react-redux';

const Menus = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const limit = 12; 
  const { menu_id, priceRange } = useSelector((state) => state.filter);
  const minPrice = priceRange[0] === "all" ? undefined : priceRange[0];
  const maxPrice = priceRange[1] === "all" ? undefined : priceRange[1];

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await getMenus({ page: currentPage, limit, menu_id, minPrice, maxPrice });
        setMenu(response);
      } catch (err) {
        setError('Failed to load menus');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDishes();
  }, [currentPage, limit, menu_id, minPrice, maxPrice]);

  const memoizedMenu = useMemo(() => menu, [menu]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const hasNext = memoizedMenu.length === limit;

  const handleNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  return (
    <>
      <GoToCartButton />
      <section id="menu" className="menu section-bg">
        <div className="container">
          <div className="section-title">
            <h2>Menu</h2>
            <p> Menu ngon của chúng tôi</p>
          </div>
          <div className='row gy-3 gx-4'>
            <div className='col-lg-3 col-md-12 col-sm-12'>
              <MenuLeftSidebar />
            </div>
            <div className='col-lg-9 col-md-12 col-sm-12 position-relative'>
              <SelectFilter />
              <div className="row menu gy-3 gx-3" data-aos="fade-up" data-aos-delay={200}>
                {memoizedMenu.map((food) => (
                  <MenusItem food={food} key={food._id} />
                ))}
              </div>
              <PaginationUser
                currentPage={currentPage}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
                hasNext={hasNext}
              />
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
