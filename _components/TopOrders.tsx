'use client';

import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice'; // Adjust path as needed
import { AppDispatch, RootState } from '@/store';

interface OrderStatusCardProps {
  title: string;
  count: number;
  icon: React.ReactElement;
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
  const dispatch = useDispatch<AppDispatch>();
  const { orderStatus, paymentStatus, currentMonth, loading, error } =
    useSelector((state: RootState) => state.dashboardStatics);

  // Fetch statistics when component mounts
  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  // Show loading state while data is being fetched
  if (loading === 'pending') {
    return <div>Đang tải...</div>;
  }

  // Show error message if there is an error
  if (error) {
    return <div>Lỗi: {error}</div>;
  }

  // Ensure dashboardData is available before accessing its properties
  const orderStatuses: OrderStatusCardProps[] = [
    {
      title: 'Đã thanh toán thanh toán',
      count: paymentStatus?.success?.count ?? 0,
      icon: <Payment fontSize="large" color="primary" />,
    },
    {
      title: 'Đặt hàng Hủy',
      count: orderStatus?.cancelled?.count ?? 0,
      icon: <Cancel fontSize="large" color="primary" />,
    },
    {
      title: 'Đơn đặt hàng được vận chuyển',
      count: orderStatus?.success?.count ?? 0,
      icon: <ShoppingCart fontSize="large" color="primary" />,
    },
    {
      title: 'Đặt hàng giao hàng',
      count: currentMonth?.totalOrders ?? 0,
      icon: <DeliveryDining fontSize="large" color="primary" />,
    },
    {
      title: 'Đang chờ xem xét',
      count: orderStatus?.pending?.count ?? 0,
      icon: <CheckCircle fontSize="large" color="primary" />,
    },
    {
      title: 'Đang chờ thanh toán',
      count: paymentStatus?.pending?.count ?? 0,
      icon: <AccessTime fontSize="large" color="primary" />,
    },
    {
      title: 'Đã giao hàng',
      count: currentMonth?.successfulOrders ?? 0,
      icon: <Check fontSize="large" color="primary" />,
    },
    {
      title: 'Trong tiến trình',
      count: orderStatus?.processing?.count ?? 0,
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
