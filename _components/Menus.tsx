import MenusList from '@/_components/MenusList';
import MenusSpecials from '@/_components/MenusSpecials';
import Spinner from '@/_components/Spinner';
import React, { Suspense } from 'react';
import GoToCartButton from './GoToCartButton';
import Image from 'next/image';

const categories = [
  { id: 1, name: 'Tất cả', productCount: 80, imageUrl: 'http://localhost:3002/images/anh4.png' },
  { id: 1, name: 'Món Khai Vị', productCount: 12, imageUrl: 'http://localhost:3002/images/anh1.png' },
  { id: 2, name: 'Món Chính', productCount: 8, imageUrl: 'http://localhost:3002/images/anh2.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
  { id: 3, name: 'Món Tráng Miệng', productCount: 5, imageUrl: 'http://localhost:3002/images/anh3.png' },
];

const Menus = () => {
  return (
    <>
      <GoToCartButton />
      <section id="menu" className="menu section-bg">
        <div className="container" data-aos="fade-up">
          <div className="section-title">
            <h2>Menu</h2>
            <p>Check Our Tasty Menu</p>
          </div>
          <div className="row" data-aos="fade-up" data-aos-delay={100}>
            <div className="col-lg-12 d-flex justify-content-center">
              <ul id="menu-flters" className="d-flex flex-wrap justify-content-center">
                {categories.slice(0, 5).map(category => (
                  <li key={category.id} data-filter={`.${category.name.toLowerCase().replace(/\s+/g, '-')}`} className="category-item">
                    <div className='category-content space-x-2'>
                      <Image
                        width={50}
                        height={50}
                        src={category.imageUrl}
                        className="object-fit-cover"
                        alt={category.name}
                        style={{ border: 'none', background: 'transparent' }}
                      />
                      <div className='category-info '>
                        <p className="category-name">{category.name}</p>
                        <p className="category-count">{category.productCount} sản phẩm</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Suspense fallback={<Spinner />}>
            <MenusList />
          </Suspense>
        </div>
      </section>

      {/* End Menu Section */}
      {/* ======= Specials Section ======= */}
      <MenusSpecials />
    </>
  );
};

export default Menus;
