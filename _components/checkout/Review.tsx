import * as React from 'react';

import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectCartTotalPrice, selectCartTotalQuantity } from '@/store/selector/cartSelectors';
import { formatPrice } from '@/utils/priceVN';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type:', detail: 'Visa' },
  { name: 'Card holder:', detail: 'Mr. John Smith' },
  { name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date:', detail: '04/2024' },
];

export default function Review() {
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);
  let shippingcost = 15000;
  if (totalQuantity > 6) {
    shippingcost = 0;
  } else if (totalQuantity > 3) {
    shippingcost = 10000;
  }
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Sản phẩm" secondary={`${totalQuantity} món`} />
          <Typography variant="body2">{formatPrice(totalPrice)} VNĐ</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Phí vận chuyển" secondary="Mua trên 3 món chỉ còn 10.000đ, và mua trên 6 món được miễn phí vận chuyển!" />
          <Typography variant="body2">{formatPrice(shippingcost)} VNĐ</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Tổng hóa đơn" secondary="" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {formatPrice(totalPrice + shippingcost)} VNĐ
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Xem lại thông tin nhận hàng
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom sx={{ color: 'text.secondary' }}>
            {addresses.join(', ')}
          </Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Stack
                  direction="row"
                  spacing={1}
                  useFlexGap
                  sx={{ width: '100%', mb: 1 }}
                >
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {payment.name}
                  </Typography>
                  <Typography variant="body2">{payment.detail}</Typography>
                </Stack>
              </React.Fragment>
            ))}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
