'use client';
import React from 'react';
import DashboardCard from '@/_components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses,
} from '@mui/lab';
import { Link, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchOrders } from '@/store/slice/orderSliceAdmin';

// Helpers
const getStatusColor = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'warning';
    case 'CONFIRMED':
      return 'secondary';
    case 'SHIPPING':
      return 'primary';
    case 'COMPLETED':
      return 'success';
    case 'CANCELLED':
      return 'error';
    default:
      return 'primary';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'PENDING':
      return 'Chờ xác nhận';
    case 'CONFIRMED':
      return 'Đã xác nhận';
    case 'SHIPPING':
      return 'Đang giao hàng';
    case 'COMPLETED':
      return 'Hoàn thành';
    case 'CANCELLED':
      return 'Đã hủy';
    default:
      return status;
  }
};

const getPaymentMethodText = (method: string) => {
  switch (method) {
    case 'COD':
      return 'Thanh toán khi nhận hàng';
    case 'BANKING':
      return 'Chuyển khoản ngân hàng';
    case 'MOMO':
      return 'Ví MoMo';
    default:
      return method;
  }
};

const UpcomingSchedules = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders } = useSelector((state: RootState) => state.order);
  console.log(orders);
  React.useEffect(() => {
    dispatch(fetchOrders({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <DashboardCard title="Cập nhật đơn hàng mới nhất">
      <>
        <Timeline
          className="theme-timeline"
          sx={{
            height: 400,
            p: 0,
            mb: { lg: '-40px' },
            '& .MuiTimelineConnector-root': {
              width: '1px',
              backgroundColor: '#efefef',
            },
            [`& .${timelineOppositeContentClasses.root}`]: {
              flex: 0.5,
              paddingLeft: 0,
            },
          }}
        >
          {orders?.slice(0, 6).map((order, index) => (
            <TimelineItem key={order.order_id}>
              <TimelineOppositeContent>
                <Typography variant="caption" color="textSecondary">
                  {getPaymentMethodText(order.payment_method.name)}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  color={getStatusColor(order.status)}
                  variant="outlined"
                />
                {index !== orders.length - 1 && <TimelineConnector />}
              </TimelineSeparator>
              <TimelineContent>
                <Typography fontWeight="600">
                  {getStatusText(order.status)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {order.total.toLocaleString()}đ
                  {order.voucher_id && ' (Áp dụng voucher)'}
                </Typography>
                <Link
                  href={`/orders/${order.order_id}`}
                  underline="none"
                  sx={{ mt: 0.5, display: 'inline-block' }}
                >
                  #{order.order_id}
                </Link>
              </TimelineContent>
            </TimelineItem>
          ))}

          {(!orders || orders.length === 0) && (
            <TimelineItem>
              <TimelineOppositeContent>
                <Typography variant="caption" color="textSecondary">
                  --:--
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot color="grey" variant="outlined" />
              </TimelineSeparator>
              <TimelineContent>
                <Typography color="textSecondary">
                  Chưa có đơn hàng nào
                </Typography>
              </TimelineContent>
            </TimelineItem>
          )}
        </Timeline>
      </>
    </DashboardCard>
  );
};

export default UpcomingSchedules;
