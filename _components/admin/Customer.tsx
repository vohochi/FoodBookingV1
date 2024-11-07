'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchBar from '@/_components/Search'; // Đảm bảo component này được định nghĩa đúng
import CustomerGrid from '@/_components/CustomerTop'; // Đảm bảo component này được định nghĩa đúng
import { useSelector, useDispatch } from 'react-redux'; // Import hooks Redux
import { selectUsers } from '@/store/selector/userSelector'; // Import user selector
import { fetchUsers } from '@/store/slice/userSlice';

export default function Customer() {
  const dispatch = useDispatch(); // Khởi tạo dispatch
  const users = useSelector(selectUsers); // Lấy người dùng từ Redux store
  const [rows, setRows] = React.useState(users); // Khởi tạo state với người dùng từ store
  const [pageSize, setPageSize] = React.useState(10); // State cho số hàng trên mỗi trang
  const [currentPage, setCurrentPage] = React.useState(1); // State cho trang hiện tại

  // Gọi fetchUsers khi component mount
  React.useEffect(() => {
    dispatch(fetchUsers({ page: currentPage + 1, limit: pageSize }) as any); // Dispatch action để lấy người dùng
  }, [dispatch, currentPage, pageSize]);

  // Cập nhật rows mỗi khi users trong store thay đổi
  React.useEffect(() => {
    setRows(users);
    console.log('Dữ liệu người dùng:', users); // In ra dữ liệu người dùng
  }, [users]);

  // Định nghĩa các cột cho DataGrid
  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'full_name',
      headerName: 'Họ và tên',
      width: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 170,
    },
    {
      field: 'phone_number',
      headerName: 'Số điện thoại',
      width: 130,
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      width: 120,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 90,
      type: 'date',
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      width: 110,
      type: 'date',
    },
  ];

  return (
    <>
      <CustomerGrid />
      <Paper sx={{ width: '100%' }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <SearchBar /> {/* Chức năng tìm kiếm */}
        </Box>
        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pagination
            paginationMode="client"
            onPageChange={(newPage) => setCurrentPage(newPage)}
            rowsPerPageOptions={[5, 10, 20]}
            sx={{ border: 0, width: '100%', overflowX: 'auto' }}
          />
        </Box>
      </Paper>
    </>
  );
}
