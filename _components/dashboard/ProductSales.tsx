'use client';
import React, { useEffect } from 'react';
import { Stack, Typography, Avatar, Box, Divider } from '@mui/material';
import { IconArrowDownRight } from '@tabler/icons-react';
import DashboardCard from '@/_components/shared/DashboardCard';
import { formatPrice } from '@/utils/priceVN';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice';

// Custom hook
const useDashboardStats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentMonth = useSelector(
    (state: RootState) => state.dashboardStatics.currentMonth
  );
  const currentWeek = useSelector(
    (state: RootState) => state.dashboardStatics.currentWeek
  );

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  return { currentMonth, currentWeek };
};

const ProductSales = () => {
  const { currentMonth, currentWeek } = useDashboardStats();

  const errorlight = '#fdede8';

  return (
    <DashboardCard title="Tổng doanh thu sản phẩm đã bán">
      <>
        <Box mb={3}>
          <Typography variant="h6" fontWeight="600" mb={1}>
            Tháng hiện tại
          </Typography>
          <Typography variant="h3" fontWeight="700">
            {formatPrice(currentMonth.totalAmount)}
          </Typography>
          <Stack direction="row" spacing={1} my={1} alignItems="center">
            <Avatar sx={{ bgcolor: errorlight, width: 21, height: 21 }}>
              <IconArrowDownRight width={18} color="#FA896B" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              TB mỗi đơn: {formatPrice(currentMonth.averageOrderValue)}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {currentMonth.month} {currentMonth.year} (Tổng:{' '}
              {currentMonth.totalOrders}, Thành công:{' '}
              {currentMonth.successfulOrders}, Hủy:{' '}
              {currentMonth.canceledOrders})
            </Typography>
          </Stack>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="h6" fontWeight="600" mb={1}>
            Tuần hiện tại
          </Typography>
          <Typography variant="h3" fontWeight="700">
            {formatPrice(currentWeek.totalAmount)}
          </Typography>
          <Stack direction="row" spacing={1} my={1} alignItems="center">
            <Avatar sx={{ bgcolor: errorlight, width: 21, height: 21 }}>
              <IconArrowDownRight width={18} color="#FA896B" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              TB mỗi đơn: {formatPrice(currentWeek.averageOrderValue)}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {new Date(currentWeek.startDate).toLocaleDateString()} -{' '}
              {new Date(currentWeek.endDate).toLocaleDateString()}
              (Tổng: {currentWeek.totalOrders}, Thành công:{' '}
              {currentWeek.successfulOrders}, Hủy: {currentWeek.canceledOrders})
            </Typography>
          </Stack>
        </Box>
      </>
    </DashboardCard>
  );
};

export default ProductSales;
