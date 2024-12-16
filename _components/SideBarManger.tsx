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
import { Category } from '@/types/Category';
import { selectCategories } from '@/store/selector/categoriesSelector';

interface SideBarManagerCategoryProps {
  selectedCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
  onSortChange: (sort: string) => void;
}

const SideBarManagerCategory: React.FC<SideBarManagerCategoryProps> = ({
  selectedCategory,
  onCategoryChange,
  onSortChange,
}) => {
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories({ page: 1, limit: 10 }));
  }, [dispatch]);

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
          selected={selectedCategory === null}
          onClick={() => onCategoryChange(null)}
        >
          <ListItemText primary="Tất cả sản phẩm" />
        </ListItemButton>

        {categories.map((category) => (
          <ListItemButton
            key={category._id}
            selected={selectedCategory?._id === category._id}
            onClick={() => onCategoryChange(category)}
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
        {['Giá: Cao đến thấp', 'Giá: Thấp đến cao'].map((text, index) => (
          <ListItemButton key={index} onClick={() => onSortChange(text)}>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default SideBarManagerCategory;
