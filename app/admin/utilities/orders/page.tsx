'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchField from '@/_components/Search';
import FilterButton from '@/_components/FilterButton';
import ActionButtons from '@/_components/ActionButtons';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Mã Hóa Đơn',
    width: 150,
  },
  {
    field: 'customerName',
    headerName: 'Tên Khách Hàng',
    width: 200,
  },
  {
    field: 'amount',
    headerName: 'Số Tiền',
    width: 150,
    type: 'number',
  },
  {
    field: 'status',
    headerName: 'Trạng Thái',
    width: 150,
    renderCell: (params) =>
      params.value ? 'Đã Thanh Toán' : 'Chưa Thanh Toán',
  },
  {
    field: 'date',
    headerName: 'Ngày Tạo',
    width: 150,
  },
  {
    field: 'actions',
    headerName: 'Hành Động',
    width: 150,
    renderCell: (params) => (
      <ActionButtons
        onEdit={() => handleEdit(params.row)}
        onDelete={() => handleDelete(params.row.id)}
        edit={true}
        delete={true}
      />
    ),
  },
];

// Hàm xử lý hành động chỉnh sửa
const handleEdit = (row) => {
  console.log('Chỉnh sửa hóa đơn:', row);
  // Thêm logic chỉnh sửa ở đây
};

// Hàm xử lý hành động xóa
const handleDelete = (id) => {
  console.log('Xóa hóa đơn với ID:', id);
  // Thêm logic xóa ở đây
};
const handleAdd = (id) => {
  console.log('add hóa đơn với ID:');
  // Thêm logic xóa ở đây
};

const rows = [
  {
    id: 1,
    customerName: 'Jon Snow',
    amount: 150.0,
    status: true,
    date: '2024-01-01',
  },
  {
    id: 2,
    customerName: 'Cersei Lannister',
    amount: 200.5,
    status: false,
    date: '2024-01-02',
  },
  {
    id: 3,
    customerName: 'Jaime Lannister',
    amount: 300.0,
    status: false,
    date: '2024-01-03',
  },
  {
    id: 4,
    customerName: 'Arya Stark',
    amount: 125.75,
    status: true,
    date: '2024-01-04',
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <SearchField />
        <Box display="flex" alignItems="center">
          <ActionButtons onAdd={handleAdd} add />
          <FilterButton />
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
