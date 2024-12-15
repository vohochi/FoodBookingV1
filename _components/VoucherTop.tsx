'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

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

const ExpiredOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: theme.palette.common.white,
  borderRadius: 10,
  opacity: 0,
  transition: 'opacity 0.3s ease-in-out',
  '&:hover': {
    opacity: 1,
  },
}));

function isVoucherExpired(endDate: Date): boolean {
  const now = new Date();
  return now > endDate;
}

const calculateTimeRemaining = (endDate: string): string => {
  const now = new Date();
  const end = new Date(endDate);
  const diffTime = end.getTime() - now.getTime();

  if (diffTime <= 0) {
    return 'Đã hết hạn';
  }

  const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}m`;
};

const TimeRemaining: React.FC<{ endDate: string; isExpired: boolean }> = ({
  endDate,
  isExpired,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeRemaining(endDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining(endDate));
    }, 60000); // Cập nhật mỗi phút

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <Typography
      variant="body2"
      color={isExpired ? 'error' : 'primary'}
      fontWeight="bold"
    >
      {timeRemaining}
    </Typography>
  );
};

interface VoucherGridProps {
  searchTerm: string;
  currentPage: number;
}

export default function VoucherGrid({
  searchTerm,
  currentPage,
}: VoucherGridProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { vouchers, loading, error, pagination } = useSelector(
    (state: RootState) => state.voucher
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponCardProps | null>(
    null
  );
  const [modalMode, setModalMode] = useState<'edit' | 'view' | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [voucherToDelete, setVoucherToDelete] =
    useState<CouponCardProps | null>(null);

  React.useEffect(() => {
    dispatch(
      fetchVouchers({
        page: currentPage,
        limit: pagination.totalItems,
        name: searchTerm || undefined,
      })
    );
  }, [dispatch, currentPage, pagination.totalItems, searchTerm]);

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

  const handleDeleteClick = (coupon: CouponCardProps) => {
    setVoucherToDelete(coupon);
    setDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (voucherToDelete) {
      dispatch(deleteVoucherAsync(voucherToDelete._id));
      toast.success(`Đã xóa voucher: ${voucherToDelete.name}`);
      setDeleteConfirmOpen(false);
      setVoucherToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmOpen(false);
    setVoucherToDelete(null);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box sx={{ flexGrow: 1, mt: 2, mb: 5, px: 2 }}>
      <Grid container spacing={3} justifyContent="center">
        {couponCards.map((coupon, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${index}`}>
            <Box position="relative">
              <CouponCard>
                <CouponIcon>{coupon.icon}</CouponIcon>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5 }}>
                  {coupon.code}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Hạn: {new Date(coupon.start).toLocaleDateString()} -{' '}
                  {new Date(coupon.end).toLocaleDateString()}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <TimeRemaining
                    endDate={new Date(coupon.end).toISOString()}
                    isExpired={isVoucherExpired(new Date(coupon.end))}
                  />
                </Box>

                <Box display="flex" justifyContent="center" mb={2}>
                  <ActionButtons
                    onDetails={() => handleOpenModal(coupon, 'view')}
                    onEdit={() => handleOpenModal(coupon, 'edit')}
                    onDelete={() => handleDeleteClick(coupon)}
                    detail
                    edit
                    delete
                  />
                </Box>
              </CouponCard>
              {isVoucherExpired(new Date(coupon.end)) && (
                <ExpiredOverlay>
                  <Typography variant="h6" fontWeight="bold">
                    ĐÃ HẾT HẠN
                  </Typography>
                </ExpiredOverlay>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>

      <CouponModal
        open={modalOpen}
        onClose={handleCloseModal}
        voucher={selectedCoupon}
        mode={modalMode}
      />

      <Dialog
        open={deleteConfirmOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Xác nhận xóa voucher'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Bạn có chắc chắn muốn xóa voucher "${voucherToDelete?.name}"?`}
            {voucherToDelete &&
              isVoucherExpired(new Date(voucherToDelete.end)) &&
              ' Voucher này đã hết hạn.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Hủy</Button>
          <Button onClick={handleDeleteConfirm} autoFocus>
            Xác nhận xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
