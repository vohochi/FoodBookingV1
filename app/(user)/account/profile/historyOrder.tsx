import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import OrderModal from './modal';
import { AppDispatch, RootState } from '@/store';
import type { Order } from '@/types/Order';
import PaginationUser from '@/_components/PaginationUser';
import { fetchOrdersUser } from '@/store/slice/orderSlice';
import Link from 'next/link';

const HistoryOrder = () => {

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  console.log('page', currentPage);

  const dispatch = useDispatch<AppDispatch>();
  const { orders, totalPages } = useSelector((state: RootState) => state.orders);
  

  useEffect(() => {
    dispatch(fetchOrdersUser(currentPage));
  }, [dispatch, currentPage]);

  const handleOpenModal = (order: Order) => {
    console.log('detail', order);
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const statusClasses: Record<string, { className: string; text: string }> = {
    pending: { className: 'badge bg-warning text-dark', text: 'Chờ xác nhận' },
    success: { className: 'badge bg-success text-light', text: 'Đã thanh toán' },
    cancelled: { className: 'badge bg-danger text-light', text: 'Đã hủy' },
    processing: { className: 'badge bg-info text-dark', text: 'Đang xử lý' },
  };

  const successfulOrders = orders?.filter((order) => order.status === 'success');

  return (
    <>
      <div className="tab-pane" id="tab-2">
        <div className="row">
          {/* Header */}
          {successfulOrders && successfulOrders.length > 0 && (
            <div className="col-md-12" >
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
          )}

          {/* Body */}
          <div className="col-md-12">
            {successfulOrders && successfulOrders.length > 0 ? (
              successfulOrders.map((order) => (
                <div
                  className="order-card p-3 mb-3 border"
                  style={{ background: '#fff', color: '#1a285a' }}
                  key={order?._id}
                >
                  <div className="row align-items-center">
                    <div className="col-2 text-center overflow-hidden">
                      <strong>{order?.order_id}</strong>
                    </div>
                    <div className="col-3 text-center">
                      {new Date(order?.createdAt || Date.now()).toLocaleDateString()}
                    </div>
                    <div className="col-2 text-center">{order?.orderDetail.length} món</div>
                    <div className="col-3 text-center">
                      <span className={statusClasses[order?.status || 'pending'].className}>
                        {statusClasses[order?.status || 'pending'].text}
                      </span>
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
              <div className="text-dark text-center">
                Bạn chưa hoàn thành đơn hàng nào.{' '}
                <Link href={'/user/menus'} style={{ color: '#1a285a', cursor: 'pointer' }}>
                  Đặt ngay
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <PaginationUser
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(event, value) => setCurrentPage(value)}
        />

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

export default HistoryOrder;
