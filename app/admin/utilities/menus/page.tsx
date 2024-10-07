'use client';
import { Paper, Box, Grid, Typography, Button, Rating } from '@mui/material';
import PageContainer from '@/_components/container/PageContainer';
import DashboardCard from '@/_components/shared/DashboardCard';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import SideBarManger from '@/_components/SideBarManger';

// Sample product data (replace with your actual data)
const products = [
  {
    title: 'The Psychology of Money',
    price: 125,
    oldPrice: 137,
    rating: 3,
    image: '/path/to/image1.jpg', // Replace with actual image path
  },
  {
    title: 'Red Velvet Dress',
    price: 150,
    oldPrice: 200,
    rating: 4,
    image: '/path/to/image2.jpg', // Replace with actual image path
  },
  {
    title: 'Short & Sweet Purse',
    price: 175,
    oldPrice: 200,
    rating: 3,
    image: '/path/to/image3.jpg', // Replace with actual image path
  },
];

// Styled component for the product card
const ProductCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.primary,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const Shadow = () => {
  return (
    <PageContainer title="Shadow" description="this is Shadow">
      <DashboardCard title="Shadow">
        <Box display="flex">
          {/* Sidebar */}
          <SideBarManger />

          {/* Main content */}
          <Box flexGrow={1} p={3}>
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <ProductCard elevation={3}>
                    <Box>
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={150}
                        height={200}
                        style={{ objectFit: 'cover', marginBottom: '16px' }}
                      />
                      <Typography variant="h6" gutterBottom>
                        {product.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ${product.price} <del>${product.oldPrice}</del>
                      </Typography>
                      <Rating value={product.rating} readOnly />
                    </Box>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: '16px' }}
                    >
                      Buy Now
                    </Button>
                  </ProductCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default Shadow;
