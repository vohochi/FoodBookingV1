import React from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterButton = () => {
  return (
    <Button
      variant="outlined"
      startIcon={<FilterListIcon />}
      sx={{
        textTransform: 'none',
        color: 'text.secondary',
        borderColor: 'divider',
        '&:hover': {
          backgroundColor: 'action.hover',
          borderColor: 'divider',
        },
        fontSize: '0.875rem',
        fontWeight: 'normal',
        padding: '6px 16px',
      }}
    >
      Filter
    </Button>
  );
};

export default FilterButton;
