'use client';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import DashboardCard from '@/_components/shared/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useEffect } from 'react';
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice';
import { formatPrice } from '@/utils/priceVN';

const TrafficDistribution = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const error = theme.palette.error.main;
  const secondary = theme.palette.success.main;
  const dispatch = useDispatch<AppDispatch>();
  const yearlyStats = useSelector(
    (state: RootState) => state.dashboardStatics.yearlyStats
  );

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  // Lấy dữ liệu của tất cả các tháng
  const monthsData = yearlyStats.map((stat) => ({
    monthName: stat.month, // Chuyển đổi số tháng thành tên tháng
    totalOrders: stat.totalOrders,
    totalAmount: stat.totalAmount,
    averageOrderValue: stat.averageOrderValue,
  }));

  // Chuẩn bị dữ liệu cho biểu đồ
  const seriescolumnchart: number[] = monthsData.flatMap((data) => [
    data.totalOrders,
    data.totalAmount,
    data.averageOrderValue,
  ]);

  const labels: string[] = monthsData.flatMap((data) => [
    `Đơn hàng (${data.monthName})`,
    `Thu nhập (${data.monthName})`,
    `Trung bình (${data.monthName})`,
  ]);

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 300, // Tăng chiều cao để có đủ không gian hiển thị
    },
    colors: [secondary, error, primary],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '14px',
            },
            value: {
              show: true,
              fontSize: '14px',
              formatter: function (val: string) {
                return formatPrice(Number(val));
              },
            },
          },
        },
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
      y: {
        formatter: function (value: number) {
          return formatPrice(value);
        },
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  return (
    <DashboardCard title="Phân phối doanh thu hàng tháng">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <Typography variant="h3" fontWeight="700">
              Phân phối doanh thu các tháng
            </Typography> */}
          <Stack spacing={3} mt={3} direction="row">
            {monthsData.map((data) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key={data.monthName}
              >
                <Avatar
                  sx={{
                    width: 9,
                    height: 9,
                    bgcolor: secondary,
                    svg: { display: 'none' },
                  }}
                />
                <Stack spacing={1} direction="column">
                  <Typography
                    variant="subtitle2"
                    fontSize="12px"
                    color="textSecondary"
                  >
                    Đơn hàng tháng: {data.monthName} ({data.totalOrders})
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    fontSize="12px"
                    color="textSecondary"
                  >
                    Doanh thu hàng tháng: {data.monthName} (
                    {formatPrice(data.totalAmount)})
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            width={'100%'}
            height="100px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default TrafficDistribution;
