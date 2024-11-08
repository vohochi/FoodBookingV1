// components/OrderItem.tsx

import React from 'react';
import { Order } from '@/types/Order';
import { Grid, Paper, Typography } from '@mui/material';
import { formatPrice } from '@/utils/priceVN'; // Đảm bảo bạn có hàm này

interface OrderItemProps {
  orderDetail: Order['orderDetail'];
}

const OrderItem: React.FC<OrderItemProps> = ({ orderDetail }) => {
  return (
    <Grid item xs={12}>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Mã sản phẩm
            </Typography>
            <Typography variant="body1">{orderDetail.menu_id}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Số lượng
            </Typography>
            <Typography variant="body1">{orderDetail.quantity}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="text.secondary">
              Đơn giá
            </Typography>
            <Typography variant="body1">
              {formatPrice(orderDetail.price)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default OrderItem;
