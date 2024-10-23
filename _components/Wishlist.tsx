'use client'
import { Button, TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FaFire, FaStar } from 'react-icons/fa6';
const Wishlist = () =>{
  return (
    <section id="wishlist" className="menu">
      <div className="container" data-aos="fade-up">
        <div className="section-title">
          <h2>Danh sách</h2>
          <p>Yêu thích của bạn</p>
        </div>
        <div className="row">
          <div className="card product-box shadow p-3 col-3" style={{ position: 'relative' }}>
            <Link href={`/user/menus/1`}>

              <div className='mx-auto overflow-hidden' style={{ width: 'full', height: 'full', position: 'relative' }}>
                <Image
                  width={200}
                  height={200}
                  src={`http://localhost:3002/images/anh1.png`}
                  className="card-img-top object-fit-cover img-hover-zoom"
                  alt={'hehe'}
                  style={{ border: 'none', background: 'none' }}
                />

              </div>
              {true && (
                <span className='badge bg-warning text-light p-2 text-center' style={{ position: 'absolute', top: '-5px', right: '10px', fontSize: '20px' }}>
                  <FaFire />
                </span>

              )}
            </Link>
            <div className="card-body row mt-2 p-0">
              <h5 className="card-title col-12" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#1a285a', fontWeight: 'bold', textAlign: 'center', paddingBottom: '20px' }}>
                Cơm gà
                <div>
                  {/* Render stars */}
                  {[...Array(5)].map((_, index) => (
                    <FaStar key={index} style={{ color: '#248F55', fontSize: '14px' }} />
                  ))}
                </div>
              </h5>
              <div className='col-5 text-start'>
                <p className="" style={{ color: '#248F55', fontSize: '18px' }}>$999999</p>
              </div>

              <div className='col-7 text-end'>
                <Button className="btn btn-success">Xem chi tiết</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
