'use client'; // Chỉ định component là client-side component

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {
  PeopleAlt,
  LocalShipping,
  Headset,
  Receipt,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '@/store/selector/userSelector';
import { AppDispatch, RootState } from '../store/index';
import { fetchDashboardStatistics } from '@/store/slice/dashboardStaticsSlice';

// Khai báo interface cho Props của StatsCard
interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactElement; // Sử dụng ReactElement cho icon
}

// Sử dụng styled để tạo các component theo phong cách
const StatsCard = styled(Box)(({ theme }) => ({
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

const StatsIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? '#212529' : '#f5f5f5',
}));

const ChangeValue = styled(Typography)<{ change: string }>(
  ({ theme, change }) => ({
    fontSize: '12px',
    fontWeight: 'bold',
    padding: '4px 8px',
    borderRadius: '8px',
    backgroundColor: change.startsWith('+')
      ? theme.palette.success.light
      : theme.palette.error.light,
    color: change.startsWith('+') ? theme.palette.success.contrastText : '#fff',
  })
);

// Component chính
const CustomerGrid: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const { paymentStatus, currentMonth, orderStatus } = useSelector(
    (state: RootState) => state.dashboardStatics
  );

  React.useEffect(() => {
    dispatch(fetchDashboardStatistics());
  }, [dispatch]);

  // Dữ liệu thống kê
  const stats: StatsCardProps[] = [
    {
      title: 'Tất cả khách hàng',
      value: `${users.length}`,
      change: '',
      icon: <PeopleAlt fontSize="large" color="primary" />,
    },
    {
      title: 'Đơn đặt hàng',
      value: `${paymentStatus.success.count}`,
      change: '',
      icon: <LocalShipping fontSize="large" color="primary" />,
    },
    {
      title: 'hàng tháng ',
      value: `${currentMonth.totalOrders}`,
      change: '',
      icon: <Headset fontSize="large" color="primary" />,
    },
    {
      title: 'Hóa đơn & Thanh toán',
      value: `${orderStatus.success.count}`,
      change: '',
      icon: <Receipt fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, mt: 2, marginBottom: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        {stats.map((stat) => (
          <Grid item xs={12} md={3} key={stat.title}>
            <StatsCard>
              <StatsIcon>{stat.icon}</StatsIcon>
              <Typography variant="subtitle1" fontWeight="bold">
                {stat.title}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {stat.value}
              </Typography>
              <ChangeValue change={stat.change}>{stat.change}</ChangeValue>
            </StatsCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CustomerGrid;
