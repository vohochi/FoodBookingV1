import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import OrderModal from "./modal"; 

const Order = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const productData = {
    orderNumber: "#DH177013",
    products: [
      {
        name: "Bánh",
        price: "1.000.000",
        quantity: 1,
        total: "1.000.000",
        image: "/img/menu/bread-barrel.jpg",
      },
      {
        name: "Tên sản phẩddddddddddddddd ddddddddddddddddddđm",
        price: "1.000.000",
        quantity: 1,
        total: "1.000.000",
        image: "/img/menu/bread-barrel.jpg",
      },
      {
        name: "Tên sản phẩm",
        price: "1.000.000",
        quantity: 1,
        total: "1.000.000",
        image: "/img/menu/bread-barrel.jpg",
      },
      {
        name: "Tên sản phẩm",
        price: "1.000.000",
        quantity: 1,
        total: "1.000.000",
        image: "/img/menu/bread-barrel.jpg",
      },
      {
        name: "Tên sản phẩm",
        price: "1.000.000",
        quantity: 1,
        total: "1.000.000",
        image: "/img/menu/bread-barrel.jpg",
      },
    ],
    total: "2.000.000",
  };

  return (
    <>
      <div className="tab-pane" id="tab-2">
        <div className="row">
          {/* Header */}
          <div className="col-md-12" style={{ marginTop: '-70px' }}>
            <div className="order-card p-3 mb-3" style={{ background: '#1a285a', color: '#fff' }}>
              <div className="row">
                <div className="col-2 text-center"><strong>Mã đơn</strong></div>
                <div className="col-3 text-center"><strong>Ngày đặt</strong></div>
                <div className="col-2 text-center"><strong>Số lượng</strong></div>
                <div className="col-3 text-center"><strong>Tình trạng</strong></div>
                <div className="col-2 text-center"><strong>Chi tiết</strong></div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="col-md-12">
            <div className="order-card p-3 mb-3 border" style={{ background: '#fff', color: '#1a285a' }}>
              <div className="row align-items-center">
                <div className="col-2 text-center"><strong>#DH177013</strong></div>
                <div className="col-3 text-center">01/10/2024</div>
                <div className="col-2 text-center">4 sản phẩm</div>
                <div className="col-3 text-center">
                  <span className="badge bg-warning text-dark">Đang xử lý</span>
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

      {/* Modal cho chi tiết đơn hàng */}
      <OrderModal isOpen={isModalOpen} onClose={handleCloseModal} productData={productData} />
    </>
  );
};

export default Order;
