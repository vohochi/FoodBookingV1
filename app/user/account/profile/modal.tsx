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
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: OrderData;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  productData,
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
          {productData.orderNumber}
        </Typography>
      </DialogTitle>
      <DialogContent className="hidden-scroll section-bg py-4">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {productData.products.map((product, index) => (
              <React.Fragment key={index}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  mb={2}
                  key={index}
                >
                  <Grid item xs={3}>
                    <Image
                      src={product.image}
                      alt={product.name}
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
                      {product.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="center">
                    <Typography variant="body1">x{product.quantity}</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="right">
                    <Typography variant="body1" fontWeight="bold">
                      {product.price} VND
                    </Typography>
                  </Grid>
                </Grid>
                {index < productData.products.length - 1 && (
                  <Divider
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.5)',
                      marginBottom: '18px',
                    }}
                  />
                )}
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
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <Typography variant="h6" align="right" sx={{ color: '#cda45e' }}>
              Tổng cộng: {productData.total} VND
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
          >
            <div onClick={onClose} className="btn btn-secondary">
              Đóng
            </div>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default OrderModal;
