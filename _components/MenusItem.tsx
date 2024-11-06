'use client';

import Image from 'next/image';
import { useState, useCallback, useEffect } from 'react';
import { Button, Slide, Zoom } from '@mui/material';
import { Menu } from '@/types/Menu';
import Link from 'next/link';
import { FaFire, FaStar } from 'react-icons/fa6';
import FoodDetailModal from './FoodDetailModal';
import { usePathname } from 'next/navigation';
import { formatPrice } from '@/utils/priceVN';


interface MenusItemProps {
  food: Menu;
}

const MenusItem = ({ food }: MenusItemProps) => {
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);


  const handleSubmit = (newQuantity: number) => {
    setQuantity(newQuantity);
    console.log('Submitted quantity:', newQuantity);
  };

  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <Zoom in={checked} style={{ transitionDelay: checked ? '100ms' : '100ms' }}>
      <div className={`${pathname === '/user/menus' ? 'col-lg-4' : 'col-lg-3'} col-md-4 col-sm-6 col-6`}>
        <div
          className="card product-box shadow p-3"
          style={{ position: 'relative' }}
        >
          <Link href={`/user/menus/${food._id}`}>
            <div
              className="mx-auto overflow-hidden"
              style={{ width: 'full', height: 'full', position: 'relative' }}
            >
              <Image
                src={`http://localhost:3002/images/${food.img}`}
                alt={food.name}
                className="mx-auto bg-transparent img-hover-zoom"
                width={400}
                height={400}
                objectFit="cover"
                style={{
                  borderRadius: '8px',
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
            {true && (
              <span
                className="badge bg-warning text-light p-2 text-center"
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '10px',
                  fontSize: '20px',
                }}
              >
                <FaFire />
              </span>
            )}
          </Link>
          <div className="card-body row mt-2 p-0">
            <h5
              className="card-title col-12"
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                color: '#1a285a',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {food.name}
            </h5>
            <div className="row align-items-center mt-2 mx-auto">
              <div className="col-lg-6 col-12 mb-lg-0 mb-2 text-center text-lg-start">
                <div className="">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      style={{ color: '#f0e68c', fontSize: '14px' }}
                    />
                  ))}
                </div>
                <p
                  className=""
                  style={{
                    color: '#1a285a',
                    fontSize: '18px',
                    marginBottom: '0px',
                  }}
                >
                  {
                    food.category._id === "672851b8d8d0335ef8fc045c" && food.variant && Array.isArray(food.variant) && food.variant.length > 0
                      ? formatPrice(food.variant[0].price)
                      : `${formatPrice(food.price)} đ`
                  }
                </p>
              </div>
              <div className="col-lg-6 col-12 text-center text-lg-end">
                <Button className="btn btn-product" onClick={handleClickOpen}>
                  Chi tiết
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        <FoodDetailModal
          open={open}
          food={food}
          quantity={quantity}
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      </div>
    </Zoom>



  );
};

export default MenusItem;
