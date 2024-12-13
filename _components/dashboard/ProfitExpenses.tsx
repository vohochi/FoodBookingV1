import React, { useEffect, useMemo } from 'react';
import { MenuItem, Box, IconButton, Menu } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/_components/shared/DashboardCard';
import dynamic from 'next/dynamic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice';
import { formatPrice } from '@/utils/priceVN';

// Lazy load ApexCharts
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Define types for chart options and series
type ChartOptions = ApexCharts.ApexOptions;
type ChartSeries = ApexAxisChartSeries | ApexNonAxisChartSeries;

const options = ['Tháng này'];

const ProfitExpenses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    totalAmount,
    averageOrderValue,
    totalOrders,
    successfulOrders,
    canceledOrders,
    month,
    year,
  } = useSelector((state: RootState) => state.dashboardStatics.currentMonth);

  useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.error.main;

  const optionscolumnchart: ChartOptions = useMemo(
    () => ({
      chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
          show: true,
        },
        height: 370,
      },
      colors: [primary, secondary],
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: '60%',
          columnWidth: '42%',
          borderRadius: 6,
          borderRadiusApplication: 'end',
          borderRadiusWhenStacked: 'all',
        },
      },
      stroke: {
        show: true,
        width: 5,
        lineCap: 'butt',
        colors: ['transparent'],
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return formatPrice(val);
        },
      },
      legend: {
        show: true,
        position: 'top',
        labels: {
          colors: theme.palette.text.primary,
        },
      },
      grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (value: number) {
            return formatPrice(value);
          },
        },
      },
      xaxis: {
        categories: ['Tổng đơn', 'Đơn thành công', 'Đơn hủy'],
        axisBorder: {
          show: false,
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
    }),
    [theme, primary, secondary]
  );

  const seriescolumnchart: ChartSeries = useMemo(
    () => [
      {
        name: 'Đơn hàng',
        data: [
          totalOrders, // Tổng số đơn
          successfulOrders, // Đơn thành công
          canceledOrders, // Đơn hủy
        ],
      },
      {
        name: 'Doanh thu',
        data: [
          totalAmount, // Tổng doanh thu
          successfulOrders * averageOrderValue, // Doanh thu đơn thành công
          0, // Doanh thu đơn hủy (để trống)
        ],
      },
    ],
    [
      totalOrders,
      successfulOrders,
      canceledOrders,
      totalAmount,
      averageOrderValue,
    ]
  );

  return (
    <DashboardCard
      title={`Thống kê doanh thu tháng ${month}/${year}`}
      action={
        <>
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            MenuListProps={{
              'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {options.map((option) => (
              <MenuItem
                key={option}
                selected={option === 'Tháng này'}
                onClick={handleClose}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </>
      }
    >
      <Box className="rounded-bars">
        <Chart
          options={optionscolumnchart}
          series={seriescolumnchart}
          type="bar"
          width={'100%'}
          height="370px"
        />
      </Box>
    </DashboardCard>
  );
};

export default ProfitExpenses;
