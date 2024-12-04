'use client'; // Specify this as a client-side component

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/index';
import { selectPaymentMethods } from '@/store/selector/paymentMethodSelector';
import { fetchPaymentMethods } from '@/store/slice/paymentMethodSlice';
import Image from 'next/image';

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

// Main component
const PaymentMethodTop: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const paymentMethods = useSelector(selectPaymentMethods);

  // Fetch payment methods on component mount
  React.useEffect(() => {
    dispatch(fetchPaymentMethods({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Stats data

  return (
    <Box sx={{ flexGrow: 1, mt: 2, marginBottom: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Stats Card */}

        {/* List of Payment Methods */}
        <Grid item xs={12}>
          <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
            Các phương thức thanh toán
          </Typography>
          <Grid container spacing={2}>
            {paymentMethods.slice(0, 6).map((method) => (
              <Grid item xs={12} md={4} key={method._id}>
                <StatsCard>
                  <StatsIcon>
                    <Image
                      src={
                        typeof method.img === 'string'
                          ? method.img
                          : '/default-image.jpg'
                      }
                      alt={method.name}
                      width={30}
                      height={30}
                    />
                  </StatsIcon>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {method.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {method.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: method.status === 'active' ? 'green' : 'red',
                      fontWeight: 'bold',
                    }}
                  >
                    {method.status === 'active'
                      ? 'Hoạt động'
                      : 'Ngừng hoạt động'}
                  </Typography>
                </StatsCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PaymentMethodTop;
