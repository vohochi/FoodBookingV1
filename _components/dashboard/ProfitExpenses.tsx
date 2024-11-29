import React, { useEffect } from 'react';
import { MenuItem, Box, IconButton, Menu, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '@/_components/shared/DashboardCard';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice';
import { formatPrice } from '@/utils/priceVN';

const options = ['Tuần này', 'Tháng này', 'Năm nay'];

const ProfitExpenses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    averageOrderValue,
    canceledOrders,
    month,
    successfulOrders,
    totalAmount,
    // totalOrders,
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

  // Xử lý dữ liệu cho biểu đồ
  const optionscolumnchart: any = {
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
        borderRadius: [6],
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
      categories: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
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
  };

  const seriescolumnchart = [
    {
      name: 'Đơn hàng thành công',
      data: [
        totalAmount,
        averageOrderValue,
        successfulOrders * averageOrderValue,
        totalAmount / 7,
        successfulOrders * (averageOrderValue / 2),
        totalAmount * 0.8,
        totalAmount * 0.6,
      ],
    },
    {
      name: 'Đơn hàng hủy',
      data: [
        canceledOrders * averageOrderValue,
        canceledOrders * (averageOrderValue / 2),
        canceledOrders * (averageOrderValue / 3),
        canceledOrders * (averageOrderValue / 4),
        canceledOrders * (averageOrderValue / 5),
        canceledOrders * (averageOrderValue / 6),
        canceledOrders * (averageOrderValue / 7),
      ],
    },
  ];

  return (
    <DashboardCard
      title={
        <Box>
          <Typography variant="h5">
            Doanh thu tháng {month}/{year}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Tổng doanh thu: {formatPrice(totalAmount)}
          </Typography>
        </Box>
      }
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
