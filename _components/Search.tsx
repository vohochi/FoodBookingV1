import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchDishesWithPagination } from '@/store/slice/menusSlice';
import { fetchOrders } from '@/store/slice/orderSlice';
import { fetchCategories } from '@/store/slice/categorySlice';
import { fetchVouchers } from '@/store/slice/voucherSlice';
import { fetchPaymentMethods } from '@/store/slice/paymentMethodSlice';
import { fetchUsers } from '@/store/slice/userSlice';

interface SearchBarProps {
  searchType: 'menu' | 'order' | 'category' | 'voucher' | 'payment' | 'user'; // Xác định kiểu tìm kiếm
}

const SearchBar: React.FC<SearchBarProps> = ({ searchType }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keySearch = event.target.value;

    switch (searchType) {
      case 'menu':
        dispatch(
          fetchDishesWithPagination({
            page: 1,
            limit: 9,
            filters: event ? { name: keySearch } : {}, // Tìm kiếm theo tên món ăn
          })
        );
        break;
      case 'order':
        dispatch(
          fetchOrders({
            page: 1,
            limit: 10,
            filters: keySearch ? { search: keySearch } : {}, // Apply the search filter
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
      case 'voucher':
        dispatch(
          fetchVouchers({
            page: 1,
            limit: 15,
            name: keySearch || undefined,
          })
        );
        break;
      case 'payment':
        dispatch(
          fetchPaymentMethods({
            page: 1, // Assuming payments are paginated
            limit: 10, // Set an appropriate limit for your payments list
            search: keySearch || '', // Pass search term to the fetchUsers action
          })
        );
        break;
      case 'user':
        dispatch(
          fetchUsers({
            page: 1, // Assuming the user search is paginated
            limit: 10, // Adjust the limit as necessary
            search: keySearch || '', // Pass search term to the fetchUsers action
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
