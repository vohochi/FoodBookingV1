'use client';

import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCategories,
  selectCategory,
} from '@/store/selector/categoriesSelector'; // Import selectors and actions
// import { Category } from '@/types/Category'; // Assuming you have this type
import { useEffect } from 'react';
import { fetchCategories } from '@/store/slice/categorySlice';
import { AppDispatch } from '@/store';

const SideBarManager = () => {
  const categories = useSelector(selectCategories); // Get categories from Redux
  const selectedCategory = useSelector(selectCategory); // Get selectedCategory from Redux
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories when the component mounts
  }, [dispatch]); // Run the effect only once

  // const handleCategoryChange = (category: Category) => {
  //   dispatch(setSelectedCategory(category)); // Dispatch action to update selectedCategory in Redux
  // };

  // const handleSortChange = (sort: string) => {
  //   // ... (Handle sort change - you'll likely need a separate action in your slice)
  // };

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
        {categories.map((category, index) => (
          <ListItemButton
            key={index}
            selected={selectedCategory?._id === category._id} // Compare _id
            // onClick={() => handleCategoryChange(category)}
          >
            <ListItemText primary={category.name} />
          </ListItemButton>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Lọc bởi
      </Typography>
      <List>
        {['Mới nhất', 'Giá: Cao đến thấp', 'Giá: Thấp đến cao'].map(
          (text, index) => (
            <ListItemButton
              key={index}
              // selected={selectedSort === text}
              // onClick={() => handleSortChange(text)}
            >
              <ListItemText primary={text} />
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );
};

export default SideBarManager;
