import React, { useEffect, useState } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Box,
  FormLabel,
  Grid,
  SelectChangeEvent,
  FormHelperText,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice, selectCartTotalQuantity } from '@/store/selector/cartSelectors';
import { formatPrice } from '@/utils/priceVN';
import { Voucher } from '@/types/Voucher';
import { applyVoucher, fetchVouchers } from '@/_lib/vouchers';

export default function Review({
  onVoucherUpdated = () => { },
}: {
  onVoucherUpdated: (code: string, hasError?: boolean) => void;
}) {
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVouchers = async () => {
      try {
        const response = await fetchVouchers();
        setVouchers(response?.data?.vouchers || []);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error loading vouchers:', error.message);
        } else {
          console.error('An unexpected error occurred');
        }
      }
    };

    loadVouchers();
  }, []);

  let shippingCost = 15000;
  if (totalQuantity > 6) {
    shippingCost = 0;
  } else if (totalQuantity > 3) {
    shippingCost = 10000;
  }

  const handleVoucherChange = async (event: SelectChangeEvent<string>) => {
    const voucherId = event.target.value;

    if (!voucherId) {
      setSelectedVoucher(null);
      setError(null);
      onVoucherUpdated('');
      return;
    }

    const voucher = vouchers.find((v) => v._id === voucherId);

    if (!voucher) {
      setSelectedVoucher(null);
      setError('Không tìm thấy voucher');
      onVoucherUpdated('');
      return;
    }

    try {
      const response = await applyVoucher(voucher.code, totalPrice);

      if (response?.success) {
        setSelectedVoucher(voucher);
        onVoucherUpdated(voucher.code);
        setDiscount(response.data.discountAmount);
        setError(null);
      } else {
        let errorMessage = '';
        switch (response?.message) {
          case `Minimum order amount required is ${voucher.min_price}`:
            errorMessage = `Bạn cần mua từ ${formatPrice(voucher.min_price)} VNĐ để sử dụng voucher này!`;
            break;
          case 'Invalid voucher code':
            errorMessage = 'Mã voucher không hợp lệ';
            break;
          case 'Voucher usage limit has been reached':
            errorMessage = 'Voucher đã đạt giới hạn sử dụng';
            break;
          case 'Voucher has expired or not yet active':
            errorMessage = 'Voucher đã hết hạn hoặc chưa kích hoạt';
            break;
          default:
            errorMessage = response?.message || 'Lỗi không xác định';
            break;
        }

        setSelectedVoucher(voucher);
        setError(errorMessage);
        onVoucherUpdated(voucher.code, true); 
      }
    } catch {
      console.error('Error applying voucher:');
      setError('Lỗi khi áp dụng voucher');
      setSelectedVoucher(null);
      onVoucherUpdated('', true);
    }
  };

  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Sản phẩm" secondary={`${totalQuantity} món`} />
          <Typography variant="body2">{formatPrice(totalPrice)} VNĐ</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Phí vận chuyển" secondary="Mua trên 3 món chỉ còn 10.000đ, và mua trên 6 món được miễn phí vận chuyển!" />
          <Typography variant="body2">{formatPrice(shippingCost)} VNĐ</Typography>
        </ListItem>
      </List>

      <Grid container spacing={0} sx={{ my: 2 }}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth error={Boolean(error)}>
            <FormLabel htmlFor="address-select" required>
              Voucher giảm giá
            </FormLabel>
            <Select
              labelId="voucher-select-label"
              value={selectedVoucher?._id || ''}
              onChange={handleVoucherChange}
              label="Chọn voucher"
            >
              <MenuItem value="">
                <Typography variant="body2" color="text.secondary">
                  Không sử dụng voucher
                </Typography>
              </MenuItem>
              {Array.isArray(vouchers) &&
                vouchers.map((voucher) => (
                  <MenuItem key={voucher._id} value={voucher._id}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        component="img"
                        src={voucher?.img ? voucher.img.toString() : ``}
                        alt={voucher.name}
                        sx={{ width: 30, height: 30, borderRadius: '4px' }}
                      />
                      <Stack>
                        <Typography variant="body2" fontWeight="bold">
                          {voucher.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {voucher.discount_percent}% giảm giá (Đơn tối thiểu: {formatPrice(voucher.min_price)} VNĐ)
                        </Typography>
                      </Stack>
                    </Box>
                  </MenuItem>
                ))}
            </Select>
            {error && <FormHelperText>{error}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="" />
            <Typography variant="body2">- {formatPrice(discount)} VNĐ</Typography>
          </ListItem>
        </Grid>
      </Grid>
      <Divider />

      {/* Tổng hóa đơn */}
      <ListItem sx={{ py: 1, px: 0 }}>
        <ListItemText primary="Tổng hóa đơn" />
        <Typography sx={{ fontWeight: 700, color: '#1a285e', fontSize: '20px' }}>
          {formatPrice(totalPrice + shippingCost - discount)} VNĐ
        </Typography>
      </ListItem>

      <Divider />
    </Stack>
  );
}
