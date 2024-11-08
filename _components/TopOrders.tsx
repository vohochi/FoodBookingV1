'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  Payment,
  ShoppingCart,
  DeliveryDining,
  CheckCircle,
  AccessTime,
  Check,
  LocalOffer,
  Cancel,
} from '@mui/icons-material';

interface OrderStatusCardProps {
  title: string;
  count: number;
  icon: React.ReactElement; // Sử dụng ReactElement cho icon
}

const OrderStatusCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

const OrderStatusIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? '#212529' : '#f5f5f5',
}));

export default function OrderStatusGrid() {
  const orderStatuses: OrderStatusCardProps[] = [
    {
      title: 'Hoàn trả thanh toán',
      count: 490,
      icon: <Payment fontSize="large" color="primary" />,
    },
    {
      title: 'Đặt hàng Hủy',
      count: 241,
      icon: <Cancel fontSize="large" color="primary" />,
    },
    {
      title: 'Đơn đặt hàng được vận chuyển',
      count: 630,
      icon: <ShoppingCart fontSize="large" color="primary" />,
    },
    {
      title: 'Đặt hàng giao hàng',
      count: 170,
      icon: <DeliveryDining fontSize="large" color="primary" />,
    },
    {
      title: 'Đang chờ xem xét',
      count: 210,
      icon: <CheckCircle fontSize="large" color="primary" />,
    },
    {
      title: 'Đang chờ thanh toán',
      count: 608,
      icon: <AccessTime fontSize="large" color="primary" />,
    },
    {
      title: 'Đã giao hàng',
      count: 200,
      icon: <Check fontSize="large" color="primary" />,
    },
    {
      title: 'Trong tiến trình',
      count: 656,
      icon: <LocalOffer fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, mt: 2, marginBottom: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        {orderStatuses.map((orderStatus) => (
          <Grid item xs={12} md={3} key={orderStatus.title}>
            <OrderStatusCard>
              <OrderStatusIcon>{orderStatus.icon}</OrderStatusIcon>
              <Typography variant="subtitle1" fontWeight="bold">
                {orderStatus.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {orderStatus.count}
              </Typography>
            </OrderStatusCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
