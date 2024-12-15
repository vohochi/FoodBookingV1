import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchDishesWithPagination } from '@/store/slice/menusSlice';
import { fetchOrders } from '@/store/slice/orderSliceAdmin';
import { fetchCategories } from '@/store/slice/categorySlice';
import { fetchPaymentMethods } from '@/store/slice/paymentMethodSlice';
import { fetchUsers } from '@/store/slice/userSlice';

interface SearchBarProps {
  searchType: 'menu' | 'order' | 'category' | 'voucher' | 'payment' | 'user';
  onSearch?: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchType, onSearch }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;

    if (onSearch) {
      onSearch(keySearch);
      return; // Thêm return để không thực hiện các dispatch khác khi onSearch được cung cấp
    }

    switch (searchType) {
      case 'menu':
        dispatch(
          fetchDishesWithPagination({
            page: 1,
            limit: 9,
            filters: event ? { name: keySearch } : {},
          })
        );
        break;
      case 'order':
        dispatch(
          fetchOrders({
            page: 1,
            limit: 10,
            filters: keySearch ? { search: keySearch } : {},
          })
        );
        break;
      case 'category':
        dispatch(
          fetchCategories({
            page: 1,
            limit: 10,
            name: keySearch || undefined,
          })
        );
        break;
      case 'payment':
        dispatch(
          fetchPaymentMethods({
            page: 1,
            limit: 10,
            search: keySearch || '',
          })
        );
        break;
      case 'user':
        dispatch(
          fetchUsers({
            page: 1,
            limit: 10,
            search: keySearch || '',
          })
        );
        break;
      default:
        console.error(`Invalid search type: ${searchType}`);
        break;
    }
  };

  return (
    <TextField
      placeholder="Search..."
      variant="outlined"
      onChange={handleSearchChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        color: '#fff',
        borderRadius: '8px',
        '.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ffffff',
          },
          '&:hover fieldset': {
            borderColor: '#ffffff',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#90caf9',
          },
        },
      }}
    />
  );
};

export default SearchBar;
