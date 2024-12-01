import MenusItem from '@/_components/MenusItem';
import { getMenus } from '@/_lib/menus';
import { Menu } from '@/types/Menu';
import { useMemo, useState, useEffect } from 'react';
import Spinner from '@/_components/Spinner';
import PaginationUser from './PaginationUser';

interface MenusListRelatedProps {
  category: string; // category_id là string
}

const MenusListRelated: React.FC<MenusListRelatedProps> = ({ category }) => {
  const [menu, setMenu] = useState<Menu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 4;

  useEffect(() => {
    const menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }

    const fetchDishes = async () => {
      try {
        const response = await getMenus({
          page: currentPage,
          limit,
          category,
        });
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
  }, [currentPage, category]);

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

export default MenusListRelated;
