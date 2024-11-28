import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons-react';
import DashboardCard from '@/_components/shared/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useEffect } from 'react';
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice';
import { formatPrice } from '@/utils/priceVN';

const TrafficDistribution = () => {
  const dispatch = useDispatch<AppDispatch>();
  const yearlyStats = useSelector(
    (state: RootState) => state.dashboardStatics.yearlyStats
  );

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const error = theme.palette.error.main;
  const secondary = theme.palette.success.main;

  // Xử lý dữ liệu từ yearlyStats
  const processYearlyData = () => {
    if (!yearlyStats || yearlyStats.length === 0)
      return {
        totalAmount: 0,
        totalOrders: 0,
        averageAmount: 0,
        growthRate: 0,
      };

    const totalAmount = yearlyStats.reduce(
      (sum, month) => sum + month.totalAmount,
      0
    );
    const totalOrders = yearlyStats.reduce(
      (sum, month) => sum + month.totalOrders,
      0
    );
    const averageAmount = totalAmount / yearlyStats.length;

    // Tính tỷ lệ tăng trưởng (so sánh tháng hiện tại với tháng trước)
    const currentMonth = yearlyStats[yearlyStats.length - 1];
    const previousMonth = yearlyStats[yearlyStats.length - 2];
    const growthRate = previousMonth
      ? ((currentMonth.totalAmount - previousMonth.totalAmount) /
          previousMonth.totalAmount) *
        100
      : 0;

    return {
      totalAmount,
      totalOrders,
      averageAmount,
      growthRate: Math.round(growthRate),
    };
  };

  const { totalAmount, totalOrders, averageAmount, growthRate } =
    processYearlyData();

  const optionscolumnchart: ApexOptions = {
    chart: {
      type: 'donut',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 170,
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
    labels: ['Đơn hàng', 'Thu nhập', 'Trung bình'],
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

  const seriescolumnchart: number[] = [totalOrders, totalAmount, averageAmount];

  return (
    <DashboardCard title="Phân phối doanh thu">
      <Grid container spacing={3}>
        <Grid item xs={6} sm={7}>
          <Typography variant="h3" fontWeight="700">
            {formatPrice(totalAmount)}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            mt={1}
            alignItems="center"
          >
            <Stack direction="row">
              <Avatar
                sx={{
                  bgcolor: growthRate >= 0 ? 'success.light' : 'error.light',
                  width: 21,
                  height: 21,
                }}
              >
                <IconArrowUpLeft
                  width={18}
                  color={growthRate >= 0 ? '#39B69A' : theme.palette.error.main}
                  style={{
                    transform: growthRate >= 0 ? 'none' : 'rotate(180deg)',
                  }}
                />
              </Avatar>
              <Typography
                variant="subtitle2"
                fontWeight="600"
                color={growthRate >= 0 ? 'success.main' : 'error.main'}
              >
                {growthRate >= 0 ? '+' : ''}
                {growthRate}%
              </Typography>
            </Stack>
            {/* <Typography variant="subtitle2" color="textSecondary">
              So với tháng trước
            </Typography> */}
          </Stack>
          <Stack spacing={3} mt={3} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: secondary,
                  svg: { display: 'none' },
                }}
              />
              <Typography
                variant="subtitle2"
                fontSize="12px"
                color="textSecondary"
              >
                Đơn hàng ({totalOrders})
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{
                  width: 9,
                  height: 9,
                  bgcolor: error,
                  svg: { display: 'none' },
                }}
              />
              <Typography
                variant="subtitle2"
                fontSize="12px"
                color="textSecondary"
              >
                Thu nhập ({formatPrice(totalAmount)})
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={6} sm={5}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            width={'100%'}
            height="150px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default TrafficDistribution;
