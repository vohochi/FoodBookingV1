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

const options = ['Tuần này'];

const ProfitExpenses: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalAmount, averageOrderValue, startDate, endDate } = useSelector(
    (state: RootState) => state.dashboardStatics.currentWeek
  );
  useEffect(() => {
    dispatch(fetchDashboardStatistics());
    console.log(totalAmount, averageOrderValue, startDate, endDate);
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
    }),
    [theme, primary, secondary]
  );

  const seriescolumnchart: ChartSeries = useMemo(
    () => [
      {
        name: 'Đơn hàng thành công',
        data: Array(7).fill(totalAmount / 7),
      },
      {
        name: 'Đơn hàng hủy',
        data: Array(7).fill(averageOrderValue),
      },
    ],
    [totalAmount, averageOrderValue]
  );

  return (
    <DashboardCard
      title={` Doanh thu tuần (${{ startDate }}- ${endDate} `}
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
                selected={option === 'Tuần này'}
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
