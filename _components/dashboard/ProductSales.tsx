// Tạo custom hook để xử lý logic data
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice';

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

// Component chính
import React from 'react';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Fab } from '@mui/material';
import { IconArrowDownRight, IconCurrencyDollar } from '@tabler/icons-react';
import DashboardCard from '@/_components/shared/DashboardCard';

const ProductSales = () => {
  const { averageOrderValue, month, totalAmount, year } = useDashboardStats();

  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const errorlight = '#fdede8';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: [primary],
      type: 'solid',
      opacity: 0.05,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart = [
    {
      name: '',
      color: primary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title="Tổng doanh thu sản phẩm đã bán"
      action={
        <Fab color="error" size="medium" sx={{ color: '#ffffff' }}>
          <IconCurrencyDollar width={24} />
        </Fab>
      }
      footer={
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="area"
          width={'100%'}
          height="60px"
        />
      }
    >
      <>
        <Typography variant="h3" fontWeight="700" mt="-20px">
          {totalAmount?.toLocaleString() ?? '0'}
        </Typography>
        <Stack direction="row" spacing={1} my={1} alignItems="center">
          <Avatar sx={{ bgcolor: errorlight, width: 21, height: 21 }}>
            <IconArrowDownRight width={18} color="#FA896B" />
          </Avatar>
          <Typography variant="subtitle2" fontWeight="600">
            +{averageOrderValue ?? 0}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {month} {year}
          </Typography>
        </Stack>
      </>
    </DashboardCard>
  );
};

export default ProductSales;
