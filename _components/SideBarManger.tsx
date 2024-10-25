'use client';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Category } from '@/types/Category';

const SideBarManager = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedSort, setSelectedSort] = useState('Newest');

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (sort: string) => {
    setSelectedSort(sort);
  };

  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: 'background.paper',
        padding: 2,
        borderRight: '1px solid #ddd',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Danh mục
      </Typography>
      <List>
        {['All', 'Fashion', 'Books', 'Toys', 'Electronics'].map(
          (text, index) => (
            <ListItemButton
              key={index}
              selected={selectedCategory === text}
              onClick={() => handleCategoryChange(text as Category)}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          )
        )}
      </List>
      <Typography variant="h6" gutterBottom>
        Lọc bởi
      </Typography>
      <List>
        {['Newest', 'Price: High-Low', 'Price: Low-High'].map((text, index) => (
          <ListItemButton
            key={index}
            selected={selectedSort === text}
            onClick={() => handleSortChange(text)}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SideBarManager;
