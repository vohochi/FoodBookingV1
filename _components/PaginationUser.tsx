import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const PaginationUser: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination align-items-center d-flex justify-content-center pt-4">
      <Stack spacing={2}>
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={onPageChange}
            variant="outlined"
            shape="rounded"
          />
        )}
      </Stack>
    </div>
  );
};

export default PaginationUser;
