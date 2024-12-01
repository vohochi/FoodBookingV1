'use client';

import React, { useState } from 'react';
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
import { cancelOrder } from '@/_lib/orders';
import { ConfimAlert } from '@/_components/SnackbarConfimAlert';
import SnackbarNotification from '@/_components/SnackbarAlert';
import { Order, OrderDetail } from '@/types/Order';

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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [itemToCancel, setItemToCancel] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');

  const getDiscountAmount = () => {
    if (!orderData.orderDetail || orderData.orderDetail.length === 0) return 0;

    return (orderData.orderDetail as OrderDetail[]).reduce((total, product) => {
      return total + (product.quantity * product.price);
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
      success: { severity: 'success', text: 'Đã thanh toán' },
      cancelled: { severity: 'error', text: 'Đã hủy đơn' },
      processing: { severity: 'info', text: 'Đang xử lý' },
    };

    // Xác thực status
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
        }}
      >
        <Typography fontWeight="bold">{text}</Typography>
      </Alert>
    );
  };


  const handleCancel = async (order_id: string) => {
    try {
      const response = await cancelOrder(order_id);
      if (response?.message === 'Order cancelled successfully') {
        setSnackbarOpen(false);
        setTimeout(() => {
          setSnackbarMessage(`Đơn hàng đã được hủy thành công`);
          setSnackbarSeverity('success');
          setSnackbarOpen(true);
        }, 0);
      } else {
        alert('Không thể hủy đơn hàng. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error);
      alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
    }
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
        <Grid container>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography variant="h6" sx={{ color: '#cda45e' }}>
              {orderData?.order_id || 'Không xác định'}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ color: '#cda45e' }}>
              {typeof orderData?.payment_method !== 'string' && orderData?.payment_method?.description}
            </Typography>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Typography sx={{ color: '#cda45e' }}>
              {orderData?.createdAt ? new Date(orderData.createdAt).toLocaleDateString() : 'Không xác định'}
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
            {orderData?.orderDetail.map((product: OrderDetail) => (
              <React.Fragment key={product.menu_id?._id}>
                <Grid container spacing={2} alignItems="center" mb={2}>
                  <Grid item xs={3}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/${product.menu_id.img}`}
                      alt={product.menu_id.name}
                      width={70}
                      height={70}
                      style={{
                        borderRadius: '8px',
                        objectFit: 'cover',
                        height: 'auto',
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" fontWeight="bold">
                      {product.menu_id.name}
                      {product.variant_size && product.menu_id.variant?.length !== 0 ? ` (${product.variant_size})` : ''}
                    </Typography>
                  </Grid>
                  <Grid item xs={1} textAlign="center">
                    <Typography variant="body1">x{product.quantity}</Typography>
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
                        onClick={() => console.log('Action triggered')}
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
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                <Typography>
                  {orderData?.ship > 0
                    ? `Phí vận chuyển: ${formatPrice(orderData?.ship)} VNĐ`
                    : 'Miễn phí vận chuyển'}
                </Typography>
                <Typography>
                  {orderData?.voucher_id && typeof orderData.voucher_id !== 'string' && orderData.voucher_id.discount_percent > 0
                    ? `Khuyến mãi: ${formatPrice((orderData.voucher_id.discount_percent / 100) * getDiscountAmount())} VNĐ`
                    : 'Không có khuyến mãi'}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', }}>
                {orderData?.status === 'pending' && (
                  <Typography
                    onClick={() => handleOpenConfirmDialog(orderData.order_id)}
                    sx={{
                      position: 'relative',
                      color: 'red',
                      cursor: 'pointer',
                      mr: 2,
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
                {renderOrderStatus(orderData?.status)}
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
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography variant="h6" align="right" sx={{ color: '#cda45e' }}>
              Tổng cộng: {formatPrice(orderData?.total)} VNĐ
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button onClick={onClose} variant="outlined" sx={{ color: '#cda45e', borderColor: '#cda45e' }}>
              Đóng
            </Button>
            {/* {orderData?.status !== 'processing' && (
              <Button onClick={onClose} className='btn btn-danger'>
                Xóa
              </Button>
            )} */}
            {orderData?.app_trans_id !== null && orderData?.status !== 'cancelled' && (
              <Button onClick={onClose} className='btn-product3'>
                Tiếp tục thanh toán
              </Button>
            )}
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
    </Dialog>
  );
};

export default OrderModal;
