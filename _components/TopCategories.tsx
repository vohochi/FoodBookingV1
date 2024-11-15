'use client';

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Category } from '@/types/Category';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoryById } from '@/store/slice/categorySlice';
import { selectCategory } from '@/store/selector/categoriesSelector';
import { AppDispatch } from '@/store';

const CategoryCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
}));

const CategoryImage = styled(Image)({
  borderRadius: 8,
  objectFit: 'cover',
  width: '100%',
  height: 'auto',
  marginBottom: 8,
});

const CategoryTitle = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0.5),
}));

const CategoryDescription = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(14),
  color: theme.palette.text.secondary,
  lineHeight: 1.5,
  textAlign: 'center',
  maxWidth: '90%',
  marginTop: theme.spacing(0.5),
}));

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick?: (category: Category) => void;
}

export default function CategoryGrid({
  categories,
  onCategoryClick,
}: CategoryGridProps) {
  const dispatch = useDispatch<AppDispatch>();
  const selectedCategory = useSelector(selectCategory);

  const handleCategoryClick = (categoryId: string | undefined) => {
    if (categoryId) {
      dispatch(fetchCategoryById(categoryId));
      const category = categories.find((cat) => cat._id === categoryId);
      if (category && onCategoryClick) {
        onCategoryClick(category);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 6 }}>
      <Grid container spacing={3} justifyContent="center">
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={category._id}>
            <CategoryCard
              onClick={() => handleCategoryClick(category._id)}
              sx={{
                border:
                  selectedCategory?._id === category._id
                    ? '2px solid #1976d2'
                    : 'none',
                backgroundColor:
                  selectedCategory?._id === category._id
                    ? 'rgba(25, 118, 210, 0.05)'
                    : 'inherit',
              }}
            >
              <CategoryImage
                src={`http://localhost:3002/images/${category.img}`}
                alt={category.name}
                width={200}
                height={150}
              />
              <CategoryTitle variant="h6">{category.name}</CategoryTitle>
              {selectedCategory?._id === category._id && (
                <CategoryDescription variant="body2">
                  {category.description}
                </CategoryDescription>
              )}
            </CategoryCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
