import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import OrderModal from './modal';
import { RootState } from '@/store';
import { fetchOrdersUser } from '@/store/slice/orderSlice';
import { Order } from '@/types/Order';

const Order = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null); // Để lưu đơn hàng đã chọn
  console.log('data', selectedOrder);

  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);
  console.log('orders', orders);

  useEffect(() => {
    dispatch(fetchOrdersUser(1)); // Fetch đơn hàng khi component được render
  }, [dispatch]);

  const handleOpenModal = (order: Order) => {
    console.log('123',order);
    
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="tab-pane" id="tab-2">
        <div className="row">
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
                  <strong>Tình trạng</strong>
                </div>
                <div className="col-2 text-center">
                  <strong>Chi tiết</strong>
                </div>
              </div>
            </div>
          </div>
          {/* Body */}
          <div className="col-md-12">
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <div
                  className="order-card p-3 mb-3 border"
                  style={{ background: '#fff', color: '#1a285a' }}
                  key={order._id}
                >
                  <div className="row align-items-center">
                    <div className="col-2 text-center">
                      <strong>{order.order_id}</strong>
                    </div>
                    <div className="col-3 text-center">{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="col-2 text-center">{order.orderDetail.length} sản phẩm</div>
                    <div className="col-3 text-center">
                      <span className="badge bg-warning text-dark">{order.status}</span>
                    </div>
                    <div className="col-2 text-center">
                      <GiHamburgerMenu
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpenModal(order)}
                        size={24}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Chưa đặt đơn nào.</div>
            )}
          </div>
        </div>
      </div>

      {/* Modal cho chi tiết đơn hàng */}
      {selectedOrder && (
        <OrderModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          orderData={selectedOrder}
        />
      )}
    </>
  );
};

export default Order;
