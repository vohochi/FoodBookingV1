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
  console.log(order);
  // Kiểm tra nếu không có order hoặc dialog không mở
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
                    {order.status && (
                      <Chip
                        label={
                          order.status === 'success'
                            ? 'Hoàn thành'
                            : order.status === 'pending'
                            ? 'Đang chờ xử lý'
                            : order.status === 'failed'
                            ? 'Đã hủy'
                            : 'Đang xử lý'
                        }
                        color={getStatusColor(order.status)}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Trạng thái thanh toán
                    </Typography>
                    {order.payment_status && (
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
                    )}
                  </Grid>
                </Grid>
              </Box>
              <Typography variant="subtitle2" color="text.secondary">
                Phương thức thanh toán
              </Typography>
              <Typography variant="body1" gutterBottom>
                {order.payment_method?.name || 'Chưa có thông tin'}
              </Typography>

              <Typography variant="body1" gutterBottom>
                <strong>Phương thức thanh toán:</strong>{' '}
                {order.payment_method?.description || 'Chưa có thông tin'}
              </Typography>

              <Typography variant="subtitle2" color="text.secondary">
                Địa chỉ giao hàng
              </Typography>
              <Typography variant="body1" gutterBottom>
                <Typography variant="body1" gutterBottom>
                  {`${order.shipping_address.receiver}, ${order.shipping_address.phone}, ${order.shipping_address.address}`}
                </Typography>
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
                  {order.orderDetail.map((item, index) => {
                    // Kiểm tra và truy xuất thông tin menu một cách an toàn

                    return (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="body1">
                            {item.quantity ? `x ${item.quantity}` : ''}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.price && item.quantity
                              ? formatPrice(item.price * item.quantity)
                              : 'Không có giá'}
                          </Typography>

                          {/* Hiển thị Rating */}
                          {item.rating && (
                            <Typography variant="body2" color="text.secondary">
                              Đánh giá: {item.rating} sao
                            </Typography>
                          )}

                          {/* Hiển thị Variant Size */}
                          {item.variant_size && (
                            <Typography variant="body2" color="text.secondary">
                              Kích cỡ: {item.variant_size}
                            </Typography>
                          )}

                          {/* Hiển thị Comment */}
                          {item.comment && (
                            <Typography variant="body2" color="text.secondary">
                              Bình luận: {item.comment}
                            </Typography>
                          )}
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Hiển thị tổng tiền nếu có */}
                {order.total && (
                  <Box sx={{ mt: 2, textAlign: 'right' }}>
                    <Typography variant="h6">
                      Tổng tiền: {formatPrice(order.total)}
                    </Typography>
                  </Box>
                )}
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
