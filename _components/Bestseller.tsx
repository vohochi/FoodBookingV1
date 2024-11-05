
'use client'
import Image from 'next/image';
import FoodDetailModal from './FoodDetailModal';
import { getDishes } from '@/_lib/menus';
import { Menu } from '@/types/Menu';
import { useCallback, useState, useEffect, useMemo } from 'react';
import { Button } from '@mui/material';
const BestsellerList = () => {
  const [menu, setMenu] = useState<Menu[]>([]);
  useEffect(() => {
    const fetchDishes = async () => {
      const response = await getDishes();
      setMenu(response);
    };
    fetchDishes();
  }, []);

  const memoizedMenu = useMemo(() => menu, [menu]);
  return <Bestseller menu={memoizedMenu} />;
};

interface BestsellerProps {
  menu: Menu[];
}

const Bestseller = ({ menu }: BestsellerProps) => {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  useEffect(() => {
    if (menu.length > 0) {
      setActiveTab(menu[0]._id);
    }
  }, [menu]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSubmit = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const activeFood = menu.find((item) => item._id === activeTab);

  return (
    <>
      <section id="specials" className="specials">
        <div className="container">
          <div className="section-title">
            <h2>Bestsellers</h2>
            <p>Check Our Bestselling Products</p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <ul className="nav nav-tabs flex-column">
                {menu.slice(0, 5).map((food) => (
                  <li className="nav-item" key={food._id}>
                    <a
                      className={`nav-link ${activeTab === food._id ? 'active show' : ''}`}
                      onClick={() => handleTabChange(food._id)}
                    >
                      {food.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-9 mt-4 mt-lg-0">
              {activeFood && (
                <div className="tab-pane active show">
                  <div className="row">
                    <div className="col-lg-8 details order-2 order-lg-1">
                      <h3>{activeFood.name}</h3>
                      <h3 className="text-bold">{activeFood.price}</h3>
                      <p className="fst-italic">{activeFood.description}</p>
                      <Button onClick={handleClickOpen} className="btn btn-product">Chi tiết</Button>
                    </div>

                    <div className="col-lg-4 text-center order-1 order-lg-2">
                      <Image
                        width={400}
                        height={400}
                        src={`http://localhost:3002/images/${activeFood.image}`}
                        alt={activeFood.name}
                        className="img-fluid img-hover-zoom"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <FoodDetailModal
          open={open}
          food={activeFood}
          quantity={quantity}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </section>


    </>
  );
};

export default BestsellerList;
