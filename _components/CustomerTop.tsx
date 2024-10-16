'use client';

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

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactElement; // Sử dụng ReactElement cho icon
}

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

const ChangeValue = styled(Typography)(({ theme }) => ({
  fontSize: '12px',
  fontWeight: 'bold',
  padding: '4px 8px',
  borderRadius: '8px',
  backgroundColor: ({ change }) =>
    change.startsWith('+')
      ? theme.palette.success.light
      : theme.palette.error.light,
  color: ({ change }) =>
    change.startsWith('+') ? theme.palette.success.contrastText : '#fff',
}));

export default function CustomerGrid() {
  const stats: StatsCardProps[] = [
    {
      title: 'All Customers',
      value: '+22.63k',
      change: '+34.4%',
      icon: <PeopleAlt fontSize="large" color="primary" />,
    },
    {
      title: 'Orders',
      value: '+4.5k',
      change: '-8.1%',
      icon: <LocalShipping fontSize="large" color="primary" />,
    },
    {
      title: 'Services Request',
      value: '+1.03k',
      change: '+12.6%',
      icon: <Headset fontSize="large" color="primary" />,
    },
    {
      title: 'Invoice & Payment',
      value: '$38,908.00',
      change: '+45.9%',
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
}
