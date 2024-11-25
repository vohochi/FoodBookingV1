import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import {
  fetchDishesWithPagination,
  // setSearchName,
} from '@/store/slice/menusSlice'; // Đảm bảo đã import đúng action

const SearchBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Xử lý sự thay đổi giá trị trong ô tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      fetchDishesWithPagination({
        page: 1,
        limit: 9,
        filters: event ? { name: event.target.value } : {}, // Fetch dishes for the selected category
      })
    );
  };

  return (
    <TextField
      placeholder="Search..." // Nơi người dùng nhập tên món ăn
      variant="outlined"
      onChange={handleSearchChange} // Gắn sự kiện onChange để theo dõi nhập liệu
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        // Tùy chỉnh giao diện
        color: '#fff', // Màu chữ
        borderRadius: '8px', // Bo góc
        '.MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#ffffff', // Màu viền
          },
          '&:hover fieldset': {
            borderColor: '#ffffff', // Màu viền khi hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#90caf9', // Màu viền khi focus
          },
        },
      }}
    />
  );
};

export default SearchBar;
