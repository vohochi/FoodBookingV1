'use client';

import { Button, Snackbar, Alert } from '@mui/material';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { removeFromWishlist } from '@/store/slice/whishList';
import { AppDispatch, RootState } from '@/store';
import { Menu } from '@/types/Menu';
import { formatPrice } from '@/utils/priceVN';
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  // State quản lý Snackbar
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<
    'success' | 'error'
  >('success');

  const handleRemoveItem = (item: Menu) => {
    try {
      // Xóa sản phẩm khỏi danh sách yêu thích
      dispatch(removeFromWishlist({ id: item._id }));

      // Hiển thị Snackbar thông báo thành công
      setSnackbarMessage(`${item.name} đã được xóa khỏi danh sách yêu thích.`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.log(error);
      // Hiển thị Snackbar thông báo lỗi nếu có sự cố
      setSnackbarMessage('Đã xảy ra lỗi khi xóa sản phẩm!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleViewDetail = (item: Menu) => {
    // Điều hướng đến trang chi tiết sản phẩm
    router.push(`/user/menus/${item._id}`);
  };

  const handleCloseSnackbar = () => {
    // Đóng Snackbar
    setSnackbarOpen(false);
  };

  return (
    <section id="wishlist" className="menu">
      <div className="container">
        <div className="section-title">
          <h2>Danh sách</h2>
          <p>Sản phẩm yêu thích của bạn</p>
        </div>
        <div className="row">
          {wishlistItems.length === 0 ? (
            <div className="col-12 text-center text-dark">
              <p>Danh sách yêu thích của bạn đang trống</p>
            </div>
          ) : (
            wishlistItems.map((item) => (
              <div key={item._id} className="col-md-12">
                <div
                  className="order-card mb-3 border"
                  style={{ background: '#fff', color: '#1a285a' }}
                >
                  <div className="row align-items-center">
                    <div className="col-lg-2 col-md-2 text-center">
                      <Image
                        src={
                          typeof item.img === 'string' && item.img
                            ? item.img
                            : '/path/to/default-image.jpg'
                        }
                        alt={item.name}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="col-lg-8 col-md-8 row align-items-center">
                      <div className="col-lg-4 col-md-12 text-center">{item.name}</div>
                      <div className="col-lg-6 col-md-12 text-center text-truncate">
                        {item.description}
                      </div>
                      <div className="col-lg-2 col-md-12 text-center">
                        {formatPrice(item.price ?? 0)} VNĐ
                      </div>
                    </div>
                    <div className="col-lg-2 col-md-2 text-center gap-2">
                      <Button
                        className="btn btn-product2"
                        sx={{ mr: 1 }}
                        onClick={() => handleRemoveItem(item)}
                      >
                        Xóa
                      </Button>
                      <Button
                        className="btn btn-product"
                        sx={{ mr: 1 }}
                        onClick={() => handleViewDetail(item)}
                      >
                        <GiHamburgerMenu/>
                      </Button>
                    </div>


                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </section>
  );
};

export default Wishlist;
