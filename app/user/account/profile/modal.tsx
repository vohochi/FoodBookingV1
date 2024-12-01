'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import Image from 'next/image';

interface Product {
  image: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderData {
  orderNumber: string;
  products: Product[];
  total: number;
  order_id: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData: OrderData;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  orderData,
}) => {
  if (!isOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      data-aos="fade-up"
    >
      <DialogTitle
        sx={{
          background: '#1a285a',
          borderBottom: '1px solid #cde45a',
        }}
      >
        <Typography variant="h6" sx={{ color: '#cda45e' }}>
          Đơn hàng {orderData?.order_id || 'Không xác định'}
        </Typography>
      </DialogTitle>

      <DialogContent className="hidden-scroll section-bg py-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {orderData.orderDetail.map((product) => (
              <React.Fragment key={product._id}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  mb={2}
                >
                  <Grid item xs={3}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DOMAIN_BACKEND}/images/${product.menu_id.img}`}
                      alt={product.menu_id.name}
                      width={70}
                      height={70}
                      style={{
                        borderRadius: '8px',
                        objectFit: 'cover',
                        height: 'auto',
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1" fontWeight="bold">
                      {product.menu_id.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="center">
                    <Typography variant="body1">x{product.quantity}</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography variant="body1" fontWeight="bold">
                      {product.price}
                    </Typography>
                  </Grid>
                </Grid>

                {/* Divider between product items */}
                <Divider
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    marginBottom: '18px',
                  }}
                />
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          background: '#1a285a',
          borderTop: '1px solid #cde45a',
        }}
      >
        <Grid container>
          {/* Total price section */}
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Typography variant="h6" align="right" sx={{ color: '#cda45e' }}>
              Tổng cộng: {orderData.total.toLocaleString()} VND
            </Typography>
          </Grid>

          {/* Close button */}
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={onClose} variant="outlined" sx={{ color: '#cda45e', borderColor: '#cda45e' }}>
              Đóng
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
