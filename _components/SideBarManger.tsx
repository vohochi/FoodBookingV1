import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCategories } from '@/store/slice/categorySlice';
import { AppDispatch } from '@/store';
import {
  fetchDishesWithPagination,
  setSelectedCategory,
  setSortOrder,
} from '@/store/slice/menusSlice';
import { Category } from '@/types/Category';
import {
  selectCategories,
  selectCategory,
} from '@/store/selector/categoriesSelector';

const SideBarManagerCategory = () => {
  const categories = useSelector(selectCategories);
  const selectedCategory = useSelector(selectCategory);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories when the component mounts
  }, [dispatch]);

  useEffect(() => {
    console.log(`selectedCategory : ${selectedCategory}`);
    // Optionally, you can handle any side effects when selectedCategory changes
  }, [selectedCategory]);

  const handleCategoryChange = (category: Category | null) => {
    console.log(category);
    dispatch(setSelectedCategory(category ? category._id : undefined)); // Update selected category
    dispatch(
      fetchDishesWithPagination({
        page: 1,
        limit: 9,
        filters: category ? { category_id: category._id } : {}, // Fetch dishes for the selected category
      })
    );
  };

  const handleSortChange = (sort: string) => {
    // Determine sort order based on selected sort text
    const sortOrder =
      sort === 'Giá: Cao đến thấp'
        ? 'price_desc'
        : sort === 'Giá: Thấp đến cao'
        ? 'price_asc'
        : 'price_asc';

    dispatch(setSortOrder(sortOrder)); // Update sort order
    dispatch(
      fetchDishesWithPagination({
        page: 1,
        limit: 10,
        filters: { sort: sortOrder }, // Fetch dishes with the updated sort order
      })
    );
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
      <List
        sx={{
          '& .MuiListItemButton-root': {
            borderRadius: 1,
            mb: 0.5,
            transition: 'all 0.2s',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              '& .MuiListItemText-primary': {
                fontWeight: 'bold',
              },
            },
          },
        }}
      >
        <ListItemButton
          selected={selectedCategory?._id === undefined}
          onClick={() => handleCategoryChange(null)} // Handle 'All Products'
        >
          <ListItemText primary="Tất cả sản phẩm" />
        </ListItemButton>

        {categories.map((category) => (
          <ListItemButton
            key={category._id}
            selected={selectedCategory?._id === category._id}
            onClick={() => handleCategoryChange(category)} // Handle individual category
          >
            <ListItemText primary={category.name} />
          </ListItemButton>
        ))}
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Lọc bởi
      </Typography>
      <List
        sx={{
          '& .MuiListItemButton-root': {
            borderRadius: 1,
            mb: 0.5,
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          },
        }}
      >
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
