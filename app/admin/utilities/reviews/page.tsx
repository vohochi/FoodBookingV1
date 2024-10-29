'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { Avatar, Card, CardContent, CardHeader } from '@mui/material';
import { Review } from '@/types/Review'; // Import Review interface

const ReviewCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

const ReviewAvatar = styled(Avatar)(({ theme }) => ({
  width: '40px',
  height: '40px',
  marginBottom: '10px',
  backgroundColor: theme.palette.mode === 'dark' ? '#212529' : '#f5f5f5',
}));

export default function ReviewGrid() {
  const reviews: Review[] = [
    {
      review_id: 1,
      user_id: 1,
      order_id: 10,
      rating: 4,
      comment: 'Sản phẩm tuyệt vời! Chất lượng tốt, giao hàng nhanh.',
      created_at: new Date('2024-01-01'),
      updated_at: new Date('2024-01-05'),
    },
    {
      review_id: 2,
      user_id: 2,
      order_id: 12,
      rating: 5,
      comment:
        'Tôi rất hài lòng với dịch vụ của cửa hàng. Nhân viên rất chuyên nghiệp.',
      created_at: new Date('2024-01-03'),
      updated_at: new Date('2024-01-05'),
    },
    {
      review_id: 3,
      user_id: 2,
      order_id: 12,
      rating: 5,
      comment:
        'Tôi rất hài lòng với dịch vụ của cửa hàng. Nhân viên rất chuyên nghiệp.',
      created_at: new Date('2024-01-03'),
      updated_at: new Date('2024-01-05'),
    },
    // Thêm nhiều reviews khác vào đây...
  ];

  return (
    <Box sx={{ flexGrow: 1, mt: 2, marginBottom: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        {reviews.map((review) => (
          <Grid item xs={12} md={4} key={review.review_id}>
            <ReviewCard>
              <CardHeader avatar={<ReviewAvatar />} />
              <CardContent>
                <Rating
                  name="simple-controlled"
                  value={review.rating}
                  readOnly
                  icon={<StarIcon fontSize="small" />}
                />
                <Typography variant="body2" component="p">
                  {review.comment}
                </Typography>
              </CardContent>
            </ReviewCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
