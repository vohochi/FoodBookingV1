import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationControlled({
  count,
  page,
  onChangePage,
}: // rowsPerPage,
// onChangeRowsPerPage,
{
  count: number;
  page: number;
  onChangePage: (newPage: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onChangePage(value);
  };

  return (
    <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={count} page={page} onChange={handleChange} />
    </Stack>
  );
}
