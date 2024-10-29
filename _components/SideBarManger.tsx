'use client';

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Category } from '@/types/Category'; // Assuming you have this type

const SideBarManager = () => {
  // Initialize selectedCategory with a Category object
  const [selectedCategory, setSelectedCategory] = useState<Category>({
    category_id: '',
    name: 'All',
    description: '',
    createdAt: new Date(),
    updateAt: new Date(),
    img: '',
  });
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
              // Compare the name property of the Category object
              selected={selectedCategory.name === text}
              onClick={() =>
                handleCategoryChange({
                  category_id: '', // Provide a default value or a way to get category_id
                  name: text,
                  description: '', // Provide a default value or a way to get description
                  createdAt: new Date(), // Provide a default value or a way to get createdAt
                  updateAt: new Date(), // Provide a default value or a way to get updateAt
                  img: '', // Provide a default value or a way to get img
                } as Category)
              }
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
