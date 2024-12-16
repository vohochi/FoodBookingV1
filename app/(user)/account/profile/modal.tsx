'use client';

import React, { useCallback, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Divider,
  Button,
  Alert,
  AlertColor,
} from '@mui/material';
import Image from 'next/image';
import { formatPrice } from '@/utils/priceVN';
import { GiHamburgerMenu } from 'react-icons/gi';
import { ConfimAlert } from '@/_components/SnackbarConfimAlert';
import SnackbarNotification from '@/_components/SnackbarAlert';
import { Order, OrderDetail } from '@/types/Order';
import ProductDetailModal from './foodOrderModal';
import { cancelOrdersUser } from '@/store/slice/orderSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: Order;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemToCancel, setItemToCancel] = useState<string | null>(null);

  const [openProductDetail, setOpenProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<OrderDetail | null>(
    null
  );

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'info' | 'warning'
  >('success');

  const getDiscountAmount = () => {
    if (!orderData.orderDetail || orderData.orderDetail.length === 0) return 0;

    return (orderData.orderDetail as OrderDetail[]).reduce((total, product) => {
      const quantity = product.quantity || 0;
      const price = product.price || 0;
      return total + quantity * price;
    }, 0);
  };

  const renderOrderStatus = (
    status: 'pending' | 'success' | 'cancelled' | 'processing'
  ) => {
    const statusMap: Record<
      'pending' | 'success' | 'cancelled' | 'processing',
      { severity: AlertColor; text: string }
    > = {
      pending: { severity: 'warning', text: 'Chờ xác nhận' },
      success: { severity: 'success', text: 'Thành công' },
      cancelled: { severity: 'error', text: 'Đã hủy đơn' },
      processing: { severity: 'info', text: 'Đang xử lý' },
    };
    if (!statusMap[status]) {
      console.error(`Invalid status: ${status}`);
      return null;
    }
    const { severity, text } = statusMap[status];

    if (!isOpen) return null;

    return (
      <Alert
        severity={severity}
        sx={{
          backgroundColor: '#fff3cd',
          color: '#856404',
          border: '1px solid #ffeeba',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography fontWeight="bold">{text}</Typography>
      </Alert>
    );
  };

  const handleCancel = async (order_id: string) => {
    try {
      await dispatch(cancelOrdersUser(order_id));
      setSnackbarMessage(`Đơn hàng đã được hủy thành công`);
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      setSnackbarMessage('Đã xảy ra lỗi. Vui lòng thử lại sau.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };
  const getImageUrl = (imgPath: string | File | null): string => {
    if (typeof imgPath === 'string') {
      if (imgPath.startsWith('https://drive.google.com')) {
        return imgPath;
      }
      return `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/${imgPath}`;
    }
    return `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/default.png`;
  };

  const handleOpenProductDetail = useCallback((product: OrderDetail) => {
    setSelectedProduct(product);
    setOpenProductDetail(true);
  }, []);

  const handleCloseProductDetail = () => {
    setOpenProductDetail(false);
    setSelectedProduct(null);
  };

  const handleOpenConfirmDialog = (order_id: string) => {
    setItemToCancel(order_id);
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setItemToCancel(null);
  };

  const handleConfirmCancel = () => {
    if (itemToCancel) {
      handleCancel(itemToCancel);
      handleCloseConfirmDialog();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      data-aos="fade-up"
    >
      <DialogTitle
        sx={{
          background: '#1a285a',
          borderBottom: '1px solid #cde45a',
        }}
      >
        <Grid container spacing={1} alignItems="center">
          {/* Order ID */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
              order: { xs: 1, md: 1 },
            }}
          >
            <Typography variant="h6" sx={{ color: '#cda45e' }}>
              {orderData?.order_id || 'Không xác định'}
            </Typography>
          </Grid>

          {/* Payment Method */}
          <Grid
            item
            xs={6}
            md={4}
            sx={{
              textAlign: { xs: 'left', md: 'center' },
              order: { xs: 2, md: 2 },
            }}
          >
            <Typography sx={{ color: '#cda45e' }}>
              {Array.isArray(orderData?.payment_method)
                ? orderData?.payment_method[0]?.description
                : orderData?.payment_method?.description}
            </Typography>
          </Grid>

          {/* Created At */}
          <Grid
            item
            xs={6}
            md={4}
            sx={{
              textAlign: { xs: 'right', md: 'right' },
              order: { xs: 3, md: 3 },
            }}
          >
            <Typography sx={{ color: '#cda45e' }}>
              {orderData?.createdAt
                ? new Date(orderData.createdAt).toLocaleDateString()
                : 'Không xác định'}
            </Typography>
          </Grid>
        </Grid>
      </DialogTitle>

      <DialogContent
        className="hidden-scroll section-bg py-4"
        sx={{
          maxHeight: '500px',
          overflowY: 'auto',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {Array.isArray(orderData?.orderDetail) &&
              orderData?.orderDetail.map((product: OrderDetail) => (
                <React.Fragment
                  key={
                    typeof product.menu_id !== 'string' && product.menu_id?._id
                      ? product.menu_id._id
                      : undefined
                  }
                >
                  <Grid container spacing={2} alignItems="center" mb={2}>
                    <Grid item xs={3}>
                      <Image
                        src={
                          product.menu_id && typeof product.menu_id !== 'string'
                            ? getImageUrl(product.menu_id.img)
                            : `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/default.png`
                        }
                        alt={
                          product.menu_id && typeof product.menu_id !== 'string'
                            ? product.menu_id.name
                            : 'Sản phẩm'
                        }
                        width={70}
                        height={70}
                        style={{
                          borderRadius: '8px',
                          objectFit: 'cover',
                          height: 'auto',
                        }}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/default.png`;
                        }}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body1" fontWeight="bold">
                        {product.menu_id && typeof product.menu_id !== 'string'
                          ? product.menu_id.name
                          : 'Sản phẩm'}
                        {product.variant_size &&
                        typeof product.menu_id !== 'string' &&
                        product.menu_id.variant?.length !== 0
                          ? ` (${product.variant_size})`
                          : ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={1} textAlign="center">
                      <Typography variant="body1">
                        x{product.quantity}
                      </Typography>
                    </Grid>
                    <Grid item xs={3} textAlign="center">
                      <Typography variant="body1" fontWeight="bold">
                        {formatPrice(product.price)} đ
                      </Typography>
                    </Grid>
                    <Grid item xs={1} textAlign="right">
                      <Typography variant="body1" fontWeight="bold">
                        <GiHamburgerMenu
                          style={{ cursor: 'pointer' }}
                          onClick={() => handleOpenProductDetail(product)}
                          size={24}
                        />
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider
                    sx={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      marginBottom: '18px',
                    }}
                  />
                </React.Fragment>
              ))}
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid
                item
                xs={12}
                md={6}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexDirection: 'column',
                  mb: 2,
                  textAlign: { xs: 'left', md: 'left', sm: 'left' },
                }}
              >
                <Typography>
                  {orderData?.ship > 0
                    ? `Phí vận chuyển: ${formatPrice(orderData?.ship)} VNĐ`
                    : 'Miễn phí vận chuyển'}
                </Typography>
                <Typography>
                  {orderData?.voucher_id &&
                  typeof orderData.voucher_id !== 'string' &&
                  orderData.voucher_id.discount_percent > 0
                    ? `Khuyến mãi: ${formatPrice(
                        (orderData.voucher_id.discount_percent / 100) *
                          getDiscountAmount()
                      )} VNĐ`
                    : 'Không có khuyến mãi'}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sm={6}
                sx={{
                  display: 'flex',
                  justifyContent: {
                    xs: 'flex-start',
                    md: 'flex-end',
                    sm: 'flex-end',
                  },
                  mb: 2,
                }}
              >
                {orderData?.status === 'pending' && (
                  <Typography
                    onClick={() => handleOpenConfirmDialog(orderData.order_id)}
                    sx={{
                      position: 'relative',
                      color: 'red',
                      cursor: 'pointer',
                      mr: 2,
                      display: 'flex',
                      alignItems: 'center',
                      '::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '1px',
                        width: 0,
                        backgroundColor: 'red',
                        transition: 'width 0.3s ease-in-out',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                    }}
                  >
                    Hủy đơn
                  </Typography>
                )}
                {renderOrderStatus(orderData?.status || 'pending')}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogTitle
        sx={{
          background: '#1a285a',
          borderTop: '1px solid #cde45a',
        }}
      >
        <Grid container>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-start', mb: 3 }}
          >
            <Typography variant="h6" align="left" sx={{ color: '#cda45e' }}>
              Tổng cộng: {formatPrice(orderData?.total)} VNĐ
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
          >
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{ color: '#cda45e', borderColor: '#cda45e' }}
            >
              Đóng
            </Button>
            {/* {orderData?.status !== 'processing' && (
              <Button onClick={onClose} className='btn btn-danger'>
                Xóa
              </Button>
            )} */}
          </Grid>
        </Grid>
      </DialogTitle>
      <ConfimAlert
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        onConfirm={handleConfirmCancel}
        title="Xác nhận hủy"
        message="Bạn có chắc chắn muốn hủy đơn hàng này?"
      />
      <SnackbarNotification
        snackbarOpen={snackbarOpen}
        message={snackbarMessage}
        severity={snackbarSeverity}
        snackbarOnclose={() => setSnackbarOpen(false)}
      />
      {selectedProduct && (
        <ProductDetailModal
          open={openProductDetail}
          product={selectedProduct}
          order_id={orderData.order_id}
          onClose={handleCloseProductDetail}
        />
      )}
    </Dialog>
  );
};

export default OrderModal;
