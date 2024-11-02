'use client';

import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PeopleAlt, LocalShipping, ShoppingBag } from '@mui/icons-material';
import ActionButtons from '@/_components/ActionButtons';
import CouponModal from '@/_components/modalForm/VoucherForm';

interface CouponCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ReactElement;
  quantity: number; // Added quantity field
}

const CouponCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

const CouponIcon = styled(Box)(({ theme }) => ({
  width: '48px',
  height: '48px',
  margin: '0 auto 16px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  backgroundColor: theme.palette.mode === 'dark' ? '#212529' : '#f5f5f5',
}));

export default function VoucherGrid() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponCardProps | null>(
    null
  );
  const [modalMode, setModalMode] = useState<'edit' | 'view' | null>(null);

  const coupons: CouponCardProps[] = [
    {
      title: 'CVH12HAD',
      description: 'Gói phiếu giảm giá mùa hè nhỏ đẹp',
      price: '25.000',
      duration: 'thời gian: 1 Năm',
      icon: <PeopleAlt fontSize="large" color="primary" />,
      quantity: 10, // Example quantity
    },
    {
      title: 'DXANSXH',
      description: 'Gói phiếu giảm giá mùa hè trung bình',
      price: 'Miễn phí vận chuyển 45.000',
      duration: 'thời gian: 1 Năm',
      icon: <LocalShipping fontSize="large" color="primary" />,
      quantity: 5, // Example quantity
    },
    {
      title: 'XNSHAMX',
      description: 'Khách hàng mới ',
      price: '10% tối đa 50.000',
      duration: '25 tháng 11 - 2 tháng 12',
      icon: <ShoppingBag fontSize="large" color="primary" />,
      quantity: 20, // Example quantity
    },
  ];

  const handleOpenModal = (coupon: CouponCardProps, mode: 'edit' | 'view') => {
    setSelectedCoupon(coupon);
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCoupon(null);
    setModalMode(null);
  };

  const handleDelete = (coupon: CouponCardProps) => {
    // Add confirmation dialog here if needed
    console.log('Delete coupon:', coupon.title);
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 2, mb: 5, px: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {coupons.map((coupon, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${coupon.title}-${index}`}>
            <CouponCard>
              <CouponIcon>{coupon.icon}</CouponIcon>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
                {coupon.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {coupon.description}
              </Typography>
              {coupon.price && (
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="primary"
                  sx={{ mb: 2 }}
                >
                  {coupon.price}đ
                </Typography>
              )}
              {/* Display quantity */}
              {coupon.quantity && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  Số lượng: {coupon.quantity}
                </Typography>
              )}
              <Box display="flex" justifyContent="center" mb={2}>
                <ActionButtons
                  onDetails={() => handleOpenModal(coupon, 'view')}
                  onEdit={() => handleOpenModal(coupon, 'edit')}
                  onDelete={() => handleDelete(coupon)}
                  detail
                  edit
                  delete
                />
              </Box>
              {coupon.duration && (
                <Typography variant="body2" color="text.secondary">
                  {coupon.duration}
                </Typography>
              )}
            </CouponCard>
          </Grid>
        ))}
      </Grid>

      <CouponModal
        open={modalOpen}
        onClose={handleCloseModal}
        coupon={selectedCoupon}
        mode={modalMode}
      />
    </Box>
  );
}
