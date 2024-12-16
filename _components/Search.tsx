import React, { useState, useCallback } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchDishesWithPagination } from '@/store/slice/menusSlice';
import { fetchOrders } from '@/store/slice/orderSliceAdmin';
import { fetchCategories } from '@/store/slice/categorySlice';
import { fetchVouchers } from '@/store/slice/voucherSlice';
import { fetchPaymentMethods } from '@/store/slice/paymentMethodSlice';
import { fetchUsers } from '@/store/slice/userSlice';
import { debounce } from 'lodash';

interface SearchBarProps {
  searchType: 'menu' | 'order' | 'category' | 'voucher' | 'payment' | 'user';
  onSearch?: (searchValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchType, onSearch }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState('');

  // const getStatusFromVietnamese = (value: string): string => {
  //   const lowercaseValue = value.toLowerCase();
  //   if (lowercaseValue.includes('đã thanh toán')) return 'success';
  //   if (lowercaseValue.includes('chưa thanh toán')) return 'failed';
  //   if (lowercaseValue.includes('đang chờ thanh toán')) return 'pending';
  //   if (lowercaseValue.includes('đang xử lý')) return 'processing';
  //   if (lowercaseValue.includes('hoàn thành')) return 'success';
  //   if (lowercaseValue.includes('đã hủy')) return 'cancelled';
  //   if (lowercaseValue.includes('đang chờ xử lý')) return 'pending';
  //   return value;
  // };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (onSearch) {
        onSearch(value);
        return;
      }

      // const statusValue = getStatusFromVietnamese(value);

      switch (searchType) {
        case 'menu':
          dispatch(
            fetchDishesWithPagination({
              page: 1,
              limit: 9,
              filters: value ? { name: value } : {},
            })
          );
          break;
        case 'order':
          dispatch(
            fetchOrders({
              page: 1,
              limit: 10,
              filters: value
                ? {
                    search: value,
                    // status: statusValue,
                    // payment_status: statusValue,
                  }
                : {},
            })
          );
          break;
        case 'category':
          dispatch(
            fetchCategories({
              page: 1,
              limit: 10,
              name: value || undefined,
            })
          );
          break;
        case 'voucher':
          dispatch(
            fetchVouchers({
              page: 1,
              limit: 15,
              name: value || undefined,
            })
          );
          break;
        case 'payment':
          dispatch(
            fetchPaymentMethods({
              page: 1,
              limit: 10,
              search: value || '',
            })
          );
          break;
        case 'user':
          dispatch(
            fetchUsers({
              page: 1,
              limit: 10,
              search: value || '',
            })
          );
          break;
        default:
          console.error(`Invalid search type: ${searchType}`);
          break;
      }
    }, 300),
    [dispatch, searchType, onSearch]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };

  return (
    <TextField
      placeholder="Search..."
      variant="outlined"
      value={searchValue}
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
