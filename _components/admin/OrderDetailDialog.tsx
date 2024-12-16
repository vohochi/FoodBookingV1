'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import { Order } from '@/types/Order';
import Button from '@mui/material/Button';
import { formatPrice } from '@/utils/priceVN';
import { getStatusColor } from '@/_components/admin/Orders';
import { IPaymentMethod } from '@/types/PaymentMethod';
import { OrderDetail } from '@/types/Order';
import { Menu } from '@/types/Menu';
import Image from 'next/image';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CommentIcon from '@mui/icons-material/Comment';

interface OrderDetailDialogProps {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}

const OrderDetailDialog: React.FC<OrderDetailDialogProps> = ({
  open,
  onClose,
  order,
}) => {
  console.log('Entire order object:', order);

  const getPaymentMethodName = (
    paymentMethod: IPaymentMethod | IPaymentMethod[]
  ): string => {
    if (Array.isArray(paymentMethod)) {
      return paymentMethod.length > 0
        ? paymentMethod[0].name
        : 'Chưa có thông tin';
    } else {
      return paymentMethod.name || 'Chưa có thông tin';
    }
  };

  const getImageSrc = (imgPath: string) => {
    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      // Nếu là URL Google Drive, trả về trực tiếp
      if (imgPath.includes('drive.google.com')) {
        return imgPath;
      }
      // Nếu là URL khác, thêm tiền tố
      return `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/${imgPath}`;
    }
    // Nếu không phải URL, thêm tiền tố
    return `${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/${imgPath}`;
  };

  const getMenuInfo = (
    menuId: string,
    menus: Menu | Menu[] | undefined
  ): { name: string; img: string; price: number } => {
    if (!menus) {
      return {
        name: 'Không có thông tin',
        img: '/path/to/default/image.jpg',
        price: 0,
      };
    }

    const menuArray = Array.isArray(menus) ? menus : [menus];
    const menu = menuArray.find((m) => m._id === menuId);

    if (menu) {
      let imgSrc: string;
      if (typeof menu.img === 'string') {
        imgSrc = menu.img;
      } else if (menu.img instanceof File) {
        imgSrc = URL.createObjectURL(menu.img);
      } else {
        imgSrc = '/path/to/default/image.jpg';
      }
      return {
        name: menu.name,
        img: imgSrc,
        price: menu.price || 0,
      };
    }
    return {
      name: 'Không có thông tin',
      img: '/path/to/default/image.jpg',
      price: 0,
    };
  };

  if (!order || !open) {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography variant="h6">Chi tiết đơn hàng</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography>Không có thông tin đơn hàng</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">
          Chi tiết đơn hàng #{order.order_id || 'Không xác định'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Thông tin đơn hàng */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thông tin đơn hàng
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Trạng thái đơn hàng
                    </Typography>
                    <Chip
                      label={
                        order.status === 'success'
                          ? 'Hoàn thành'
                          : order.status === 'pending'
                          ? 'Đang chờ xử lý'
                          : order.status === 'cancelled'
                          ? 'Đã hủy'
                          : 'Đang xử lý'
                      }
                      color={getStatusColor(order.status)}
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Trạng thái thanh toán
                    </Typography>
                    <Chip
                      label={
                        order.payment_status === 'success'
                          ? 'Đã thanh toán'
                          : 'Chưa thanh toán'
                      }
                      color={
                        order.payment_status === 'success'
                          ? 'success'
                          : 'warning'
                      }
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Typography variant="body1" gutterBottom>
                <strong>Phương thức thanh toán:</strong>{' '}
                {getPaymentMethodName(order.payment_method)}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                Địa chỉ giao hàng
              </Typography>
              <Typography variant="body1" gutterBottom>
                {`${order.shipping_address.receiver}, ${order.shipping_address.phone}, ${order.shipping_address.address}`}
              </Typography>
            </Grid>

            {/* Thông tin thời gian */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Thời gian
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Ngày đặt hàng
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString('vi-VN')
                    : 'Chưa có thông tin'}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {order.orderDetail && order.orderDetail.length > 0 && (
            <>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Danh sách sản phẩm
                </Typography>
                <Grid container spacing={2}>
                  {order.orderDetail.map((item: OrderDetail, index: number) => {
                    const menuInfo = getMenuInfo(
                      item.menu_id as string,
                      order.menu
                    );
                    console.log(`Product ${index + 1}:`, {
                      name: menuInfo.name,
                      image: menuInfo.img,
                      price: menuInfo.price,
                      quantity: item.quantity,
                      variant_size: item.variant_size,
                      rating: item.rating,
                      comment: item.comment,
                    });
                    return (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mb: 1,
                            }}
                          >
                            <Image
                              src={getImageSrc(menuInfo.img)}
                              alt={menuInfo.name}
                              width={60}
                              height={60}
                              style={{ marginRight: 12 }}
                            />
                            <Box>
                              <Typography variant="body1">
                                {menuInfo.name}
                              </Typography>
                              <Typography variant="body2">
                                Số lượng: {item.quantity}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {formatPrice(item.price * item.quantity)}
                              </Typography>
                              {item.variant_size && (
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  Kích cỡ: {item.variant_size}
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          {/* Hiển thị đánh giá */}
                          {item.rating !== null &&
                            item.rating !== undefined && (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  mt: 1,
                                }}
                              >
                                {[...Array(5)].map((_, i) =>
                                  i < item.rating! ? (
                                    <StarIcon
                                      key={i}
                                      sx={{ color: 'gold', fontSize: 20 }}
                                    />
                                  ) : (
                                    <StarBorderIcon
                                      key={i}
                                      sx={{ color: 'gold', fontSize: 20 }}
                                    />
                                  )
                                )}
                                <Typography variant="body2" sx={{ ml: 1 }}>
                                  {item.rating}/5
                                </Typography>
                              </Box>
                            )}

                          {/* Hiển thị bình luận */}
                          {item.comment && (
                            <Box
                              sx={{
                                mt: 1,
                                display: 'flex',
                                alignItems: 'flex-start',
                              }}
                            >
                              <CommentIcon
                                sx={{ fontSize: 20, mr: 1, mt: 0.5 }}
                              />
                              <Typography variant="body2">
                                {`"${item.comment}"`}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Hiển thị tổng tiền */}
                <Box sx={{ mt: 2, textAlign: 'right' }}>
                  <Typography variant="h6">
                    Tổng tiền: {formatPrice(order.total)}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailDialog;
