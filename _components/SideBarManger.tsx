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
} from '@/store/selector/categoriesSelector';
import { useEffect } from 'react';
import { fetchCategories } from '@/store/slice/categorySlice';
import { AppDispatch } from '@/store';
import {
  fetchDishesWithPagination,
  setSelectedCategory,
  setSortOrder,
} from '@/store/slice/menusSlice';
import { Category } from '@/types/Category';

const SideBarManagerCategory = () => {
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectCategory);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (category: Category) => {
    dispatch(setSelectedCategory(category));
    dispatch(fetchDishesWithPagination({ category: category._id }));
  };

  const handleSortChange = (sort: string) => {
    dispatch(setSortOrder(sort));
    dispatch(fetchDishesWithPagination({ sort }));
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
        {categories.map((category, index) => (
          <ListItemButton
            key={index}
            selected={selectedCategory?._id === category._id}
            onClick={() => handleCategoryChange(category)}
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
            <ListItemButton key={index} onClick={() => handleSortChange(text)}>
              <ListItemText primary={text} />
            </ListItemButton>
          )
        )}
      </List>
    </Box>
  );
};

export default SideBarManagerCategory;
