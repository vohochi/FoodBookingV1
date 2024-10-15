'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PeopleAlt, LocalShipping, ShoppingBag } from '@mui/icons-material';
import { Button } from '@mui/material';

interface CouponCardProps {
  title: string;
  description: string;
  price: string;
  buttonText: string;
  duration: string;
  icon: React.ReactElement; // Sử dụng ReactElement cho icon
}

const CouponCard = styled(Box)(({ theme }) => ({
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

const CouponIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  marginBottom: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? '#212529' : '#f5f5f5',
}));

const CouponButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export default function VoucherGrid() {
  const coupons: CouponCardProps[] = [
    {
      title: '4 Coupons',
      description: 'Small nice summer coupons pack',
      price: '$140.00',
      buttonText: 'Buy Now',
      duration: 'Duration: 1 Year',
      icon: <PeopleAlt fontSize="large" color="primary" />,
    },
    {
      title: '8 Coupons',
      description: 'Medium nice summer coupons pack',
      price: '$235.00',
      buttonText: 'Buy Now',
      duration: 'Duration: 1 Year',
      icon: <LocalShipping fontSize="large" color="primary" />,
    },
    {
      title: '30% Special discounts for customers',
      description: '25 November - 2 December',
      price: '',
      buttonText: 'View Plan',
      duration: '',
      icon: <ShoppingBag fontSize="large" color="primary" />,
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, mt: 2, marginBottom: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        {coupons.map((coupon) => (
          <Grid item xs={12} md={4} key={coupon.title}>
            <CouponCard>
              <CouponIcon>{coupon.icon}</CouponIcon>
              <Typography variant="subtitle1" fontWeight="bold">
                {coupon.title}
              </Typography>
              <Typography variant="body2">{coupon.description}</Typography>
              <Typography variant="h5" fontWeight="bold">
                {coupon.price}
              </Typography>
              <CouponButton variant="contained" fullWidth>
                {coupon.buttonText}
              </CouponButton>
              <Typography variant="body2">{coupon.duration}</Typography>
            </CouponCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
