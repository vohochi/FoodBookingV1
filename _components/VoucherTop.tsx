'use client';

import * as React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { PeopleAlt, LocalShipping, ShoppingBag } from '@mui/icons-material';
import ActionButtons from '@/_components/ActionButtons';
import CouponModal from '@/_components/modalForm/VoucherForm';
import { RootState, AppDispatch } from '@/store';
import { Voucher } from '@/types/Voucher';
import { deleteVoucherAsync, fetchVouchers } from '@/store/slice/voucherSlice';
import toast from 'react-hot-toast';

export interface CouponCardProps extends Voucher {
  icon: React.ReactElement;
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
  const dispatch = useDispatch<AppDispatch>();
  const { vouchers, loading, error } = useSelector(
    (state: RootState) => state.voucher
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponCardProps | null>(
    null
  );
  const [modalMode, setModalMode] = useState<'edit' | 'view' | null>(null);

  React.useEffect(() => {
    dispatch(fetchVouchers({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Map vouchers to CouponCardProps with icons
  const couponCards: CouponCardProps[] = vouchers.map((voucher) => ({
    ...voucher,
    icon: getVoucherIcon(voucher),
  }));

  // Function to assign icons based on voucher characteristics
  function getVoucherIcon(voucher: Voucher): React.ReactElement {
    if (voucher?.name?.toLowerCase().includes('vận chuyển')) {
      return <LocalShipping fontSize="large" color="primary" />;
    }
    if (voucher?.name?.toLowerCase().includes('khách hàng')) {
      return <PeopleAlt fontSize="large" color="primary" />;
    }
    return <ShoppingBag fontSize="large" color="primary" />;
  }

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
    // Dispatch delete action here
    toast.success(`Bạn đã xóa voucher: ${coupon.name}`);
    dispatch(deleteVoucherAsync(coupon._id));
    console.log('Delete voucher:', coupon.name);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1, mt: 2, mb: 5, px: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {couponCards.slice(0, 3).map((coupon, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${index}`}>
            <CouponCard>
              <CouponIcon>{coupon.icon}</CouponIcon>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
                {coupon.code}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {coupon.name}
              </Typography>
              {coupon.discount_percent && (
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  color="primary"
                  sx={{ mb: 2 }}
                >
                  {coupon.discount_percent}%
                </Typography>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Hạn: {new Date(coupon.start).toLocaleDateString()} -{' '}
                {new Date(coupon.end).toLocaleDateString()}
              </Typography>

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
            </CouponCard>
          </Grid>
        ))}
      </Grid>

      <CouponModal
        open={modalOpen}
        onClose={handleCloseModal}
        // coupon={selectedCoupon}
        voucher={selectedCoupon}
        mode={modalMode}
      />
    </Box>
  );
}
