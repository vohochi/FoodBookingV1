import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar } from '@mui/material';
import { IconArrowDownRight } from '@tabler/icons-react';
import DashboardCard from '@/_components/shared/DashboardCard';
import { formatPrice } from '@/utils/priceVN';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice';

// Custom hook (unchanged from previous implementation)
const useDashboardStats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const stats = useSelector(
    (state: RootState) => state.dashboardStatics.currentMonth
  );

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  return stats;
};

const ProductSales = () => {
  const {
    averageOrderValue,
    month,
    totalAmount,
    year,
    totalOrders,
    successfulOrders,
    canceledOrders,
  } = useDashboardStats();

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const errorlight = '#fdede8';

  // Dynamic chart options based on order data
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: { show: false },
      height: 60,
      sparkline: { enabled: true },
      group: 'sparklines',
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      colors: [primary],
      type: 'solid',
      opacity: 0.05,
    },
    markers: { size: 0 },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  // Dynamically generate chart series based on orders
  // const seriescolumnchart = [
  //   {
  //     name: 'Orders',
  //     color: primary,
  //     data: [totalOrders, successfulOrders, canceledOrders, averageOrderValue],
  //   },
  // ];

  return (
    <DashboardCard
      title="Tổng doanh thu sản phẩm đã bán"
      // footer={
      //   <Chart
      //     options={optionscolumnchart}
      //     series={seriescolumnchart}
      //     type="area"
      //     width={'100%'}
      //     height="60px"
      //   />
      // }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {formatPrice(totalAmount)}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 21, height: 21 }}>
            <IconArrowDownRight width={18} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            TB mỗi đơn: {formatPrice(averageOrderValue)}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {month} {year} (Tổng: {totalOrders}, Thành công: {successfulOrders},
            Hủy: {canceledOrders})
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default ProductSales;
