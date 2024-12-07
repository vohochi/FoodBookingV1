import React, { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import OrderModal from './modal'; // Đường dẫn đến component modal

const HistoryOrder = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  interface Product {
    image: string;
    name: string;
    quantity: number;
    price: number;
    total: number; // Total should be a number
  }
  interface OrderData {
    orderNumber: string;
    products: Product[];
    total: number; // Total should be a number
  }

  // Dữ liệu mẫu cho sản phẩm
  const productData: OrderData = {
    orderNumber: '#DH177013',
    products: [
      {
        name: 'Bánh',
        price: 1000000,
        quantity: 1,
        total: 1000000,
        image: '/img/menu/bread-barrel.jpg',
      },
      {
        name: 'Tên sản phẩddddddddddddddd ddddddddddddddddddđm',
        price: 1000000,
        quantity: 1,
        total: 1000000,
        image: '/img/menu/bread-barrel.jpg',
      },
      {
        name: 'Tên sản phẩm',
        price: 1000000,
        quantity: 1,
        total: 1000000,
        image: '/img/menu/bread-barrel.jpg',
      },
      {
        name: 'Tên sản phẩm',
        price: 1000000,
        quantity: 1,
        total: 1000000,
        image: '/img/menu/bread-barrel.jpg',
      },
      {
        name: 'Tên sản phẩm',
        price: 1000000,
        quantity: 1,
        total: 1000000,
        image: '/img/menu/bread-barrel.jpg',
      },
    ],
    total: 2000000,
  };
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {/* Header */}
          <div className="col-md-12" style={{ marginTop: '-70px' }}>
            <div
              className="order-card p-3 mb-3"
              style={{ background: '#1a285a', color: '#fff' }}
            >
              <div className="row">
                <div className="col-2 text-center">
                  <strong>Mã đơn</strong>
                </div>
                <div className="col-3 text-center">
                  <strong>Ngày đặt</strong>
                </div>
                <div className="col-2 text-center">
                  <strong>Số lượng</strong>
                </div>
                <div className="col-3 text-center">
                  <strong>Giá</strong>
                </div>
                <div className="col-2 text-center">
                  <strong>Chi tiết</strong>
                </div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="col-md-12">
            <div
              className="order-card p-3 mb-3 border"
              style={{ background: '#fff', color: '#1a285a' }}
            >
              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <strong>#DH177013</strong>
                </div>
                <div className="col-3 text-center">01/10/2024</div>
                <div className="col-2 text-center">4 sản phẩm</div>
                <div className="col-3 text-center">
                  <strong className="credits">
                    <a href="#">1.000.000 VNĐ</a>
                  </strong>
                </div>
                <div className="col-2 text-center">
                  <GiHamburgerMenu
                    style={{ cursor: 'pointer' }}
                    onClick={handleOpenModal}
                    size={24}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div
              className="order-card p-3 mb-3 border"
              style={{ background: '#fff', color: '#1a285a' }}
            >
              <div className="row align-items-center">
                <div className="col-2 text-center">
                  <strong>#DH177013</strong>
                </div>
                <div className="col-3 text-center">01/10/2024</div>
                <div className="col-2 text-center">4 sản phẩm</div>
                <div className="col-3 text-center">
                  <strong className="credits">
                    <a href="#">1.000.000 VNĐ</a>
                  </strong>
                </div>
                <div className="col-2 text-center">
                  <GiHamburgerMenu
                    style={{ cursor: 'pointer' }}
                    onClick={handleOpenModal}
                    size={24}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        productData={productData}
      />
    </>
  );
};

export default HistoryOrder;
