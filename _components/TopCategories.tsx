'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Category } from '@/types/Category';

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 10,
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <Box sx={{ flexGrow: 1, mt: 2, marginBottom: 5 }}>
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={12} md={3} key={category.category_id}>
            <Item>
              <img
                src={category.img}
                alt={category.name}
                style={{ width: '100%', height: 'auto', marginBottom: 10 }}
              />
              <Typography variant="subtitle1" fontWeight="bold">
                {category.name}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
