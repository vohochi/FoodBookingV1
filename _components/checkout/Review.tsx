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
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice, selectCartTotalQuantity } from '@/store/selector/cartSelectors';
import { formatPrice } from '@/utils/priceVN';
import { Voucher } from '@/types/Voucher';
import { fetchVouchers } from '@/_lib/vouchers';
import { getValidSrc } from '../ValidImage';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];

export default function Review({
  onVoucherUpdated = () => { },
}: {
  onVoucherUpdated: (code: string) => void;
}) {
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);
  const [vouchers, setVouchers] = React.useState<Voucher[]>([]);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    const loadVouchers = async () => {
      try {
        const response = await fetchVouchers();
        setVouchers(response.data.vouchers);
      } catch (error) {
        console.error('Error loading vouchers:', error);
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

  let discount = selectedVoucher ? (totalPrice * selectedVoucher.discount_percent) / 100 : 0;
  if (selectedVoucher && selectedVoucher.min_price && discount > selectedVoucher.min_price) {
    discount = selectedVoucher.min_price;
  }


  const handleVoucherChange = (event: SelectChangeEvent<string>) => {
    const voucherId = event.target.value;

    if (voucherId === '') {
      setSelectedVoucher(null);
      onVoucherUpdated('');
    } else {
      const voucher = vouchers.find((v) => v._id === voucherId);
      setSelectedVoucher(voucher || null);
      console.log('aaaa', voucher?.code);
      onVoucherUpdated(voucher?.code || '');
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
          <FormControl fullWidth>
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
                        sx={{ width: 40, height: 40, borderRadius: '4px' }}
                      />
                      <Stack>
                        <Typography variant="body2" fontWeight="bold">
                          {voucher.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {voucher.discount_percent}% giảm giá (Tối đa: {formatPrice(voucher.min_price)} VNĐ)
                        </Typography>
                      </Stack>
                    </Box>
                  </MenuItem>
                ))}
            </Select>
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
      <ListItem sx={{ py: 1, px: 0, }}>
        <ListItemText primary="Tổng hóa đơn" />
        <Typography sx={{ fontWeight: 700, color: '#1a285e', fontSize: '20px' }}>
          {formatPrice(totalPrice + shippingCost - discount)} VNĐ
        </Typography>
      </ListItem>

      <Divider />

      <Stack spacing={2} sx={{ my: 2 }}>
        <div>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {`0123456789`}
          </Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {addresses.join(', ')}
          </Typography>
        </div>
        <div>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Thanh toán khi nhận hàng
          </Typography>
        </div>
      </Stack>
    </Stack>
  );
}
