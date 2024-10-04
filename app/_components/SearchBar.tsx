// components/SearchBar.jsx
import React from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        size="small"
        style={{
          borderRadius: '8px',
          backgroundColor: '#f3f4f6',
          marginRight: '8px',
        }}
      />
      <IconButton type="submit" aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
