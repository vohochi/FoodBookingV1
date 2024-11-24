import * as React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotalPrice } from '@/store/selector/cartSelectors';
import { formatPrice } from '@/utils/priceVN';


export default function Info() {
  const totalPrice = useSelector(selectCartTotalPrice);
  const items = useSelector(selectCartItems);

  return (
    <React.Fragment>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        Tổng cộng
      </Typography>
      <Typography variant="h4" gutterBottom>
        {formatPrice(totalPrice)} VNĐ
      </Typography>
      <List disablePadding>
        {items.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              sx={{ mr: 2 }}
              primary={product.name}
              secondary={`x ${product.quantity}`}
            />
            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
              {formatPrice(product.price * product.quantity)} VNĐ
            </Typography>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
