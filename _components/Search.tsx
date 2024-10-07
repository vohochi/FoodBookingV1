import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <TextField
      placeholder="Search..."
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{
        // backgroundColor: '#212121', // Màu nền của thanh tìm kiếm
        color: '#fff', // Màu chữ
        borderRadius: '8px', // Bo góc cho thanh tìm kiếm
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
