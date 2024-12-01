'use client';

import { Button } from '@mui/material';
import Image from 'next/image';
const Wishlist = () => {
  return (
    <section id="wishlist" className="menu">
      <div className="container">
        <div className="section-title">
          <h2>Danh sách</h2>
          <p>Sản phẩm yêu thích của bạn</p>
        </div>
        <div className="row">
          {/* Header */}
          <div className="col-md-12">
            <div
              className="order-card mb-3 border"
              style={{ background: '#fff', color: '#1a285a' }}
            >
              <div className="row align-items-center">
                <div className="col-1 text-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/anh1.png`}
                    alt="Product"
                    width={80}
                    height={80}

                  />
                </div>
                <div className="col-3 text-center">Cơm chiên phở bò</div>
                <div className="col-4 text-center text-truncate">Cơm chiên phở bòoooooo ooooooooooooooo oooooooooooo</div>
                <div className="col-2 text-center">20.000 VNĐ</div>
                <div className="col-2 text-center">
                  <Button className='btn btn-product2' sx={{ mr: 1 }}>
                    Xóa
                  </Button>
                  <Button className='btn btn-product'>
                    Chi tiết
                  </Button>
                </div>
              </div>

            </div>
          </div>
          <div className="col-md-12">
            <div
              className="order-card mb-3 border"
              style={{ background: '#fff', color: '#1a285a' }}
            >
              <div className="row align-items-center">
                <div className="col-1 text-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/anh1.png`}
                    alt="Product"
                    width={80}
                    height={80}

                  />
                </div>
                <div className="col-3 text-center">Cơm chiên phở bò</div>
                <div className="col-4 text-center text-truncate">Cơm chiên phở bòoooooo ooooooooooooooo oooooooooooo</div>
                <div className="col-2 text-center">20.000 VNĐ</div>
                <div className="col-2 text-center">
                  <Button className='btn btn-product2' sx={{ mr: 1 }}>
                    Xóa
                  </Button>
                  <Button className='btn btn-product'>
                    Chi tiết
                  </Button>
                </div>
              </div>

            </div>
          </div>
          <div className="col-md-12">
            <div
              className="order-card mb-3 border"
              style={{ background: '#fff', color: '#1a285a' }}
            >
              <div className="row align-items-center">
                <div className="col-1 text-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/anh1.png`}
                    alt="Product"
                    width={80}
                    height={80}

                  />
                </div>
                <div className="col-3 text-center">Cơm chiên phở bò</div>
                <div className="col-4 text-center text-truncate">Cơm chiên phở bòoooooo ooooooooooooooo oooooooooooo</div>
                <div className="col-2 text-center">20.000 VNĐ</div>
                <div className="col-2 text-center">
                  <Button className='btn btn-product2' sx={{ mr: 1 }}>
                    Xóa
                  </Button>
                  <Button className='btn btn-product'>
                    Chi tiết
                  </Button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default Wishlist;
