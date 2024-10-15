'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Order } from '@/types/Order'; // Import Order interface
import SearchBar from '@/_components/Search';
import OrderStatusGrid from '@/_components/TopOrders';

const initialRows: Order[] = [
  {
    order_id: 1,
    user_id: 1,
    total_price: 150.0,
    status: 'pending',
    payment_method: 'cash',
    created_at: new Date('2024-01-01'),
    updated_at: new Date('2024-01-05'),
  },
  {
    order_id: 2,
    user_id: 2,
    total_price: 80.0,
    status: 'completed',
    payment_method: 'card',
    created_at: new Date('2024-01-03'),
    updated_at: new Date('2024-01-05'),
  },
  // Add more sample data here...
];

export default function DataTable() {
  const [rows, setRows] = React.useState<Order[]>(initialRows);

  const handleUpdateStatus = (order_id: number, newStatus: string) => {
    setRows(
      rows.map((row) =>
        row.order_id === order_id ? { ...row, status: newStatus } : row
      )
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'order_id',
      headerName: 'Mã Đơn Hàng',
      width: 150,
    },
    {
      field: 'user_id',
      headerName: 'Mã Khách Hàng',
      width: 150,
    },
    {
      field: 'total_price',
      headerName: 'Tổng Tiền',
      width: 100,
      type: 'number',
    },
    {
      field: 'status',
      headerName: 'Trạng Thái',
      width: 150,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['pending', 'completed'],
      renderCell: (params) => (
        <select
          value={params.value}
          onChange={(event) =>
            handleUpdateStatus(
              params.row.order_id,
              event.target.value as string
            )
          }
          style={{
            backgroundColor: '#f0f0f0', // Light gray background
            border: '1px solid #ddd', // Light gray border
            borderRadius: '8px', // More rounded corners
            padding: '10px 16px', // More padding
            fontSize: '16px', // Larger font size
            appearance: 'none', // Remove default browser styles
            cursor: 'pointer', // Add cursor pointer
          }}
        >
          <option value="pending">Chờ xử lý</option>
          <option value="completed">Hoàn thành</option>
        </select>
      ),
    },
    {
      field: 'payment_method',
      headerName: 'Phương thức thanh toán',
      width: 150,
    },
    {
      field: 'created_at',
      headerName: 'Ngày Tạo',
      width: 150,
      type: 'date',
    },
    {
      field: 'updated_at',
      headerName: 'Ngày Cập Nhật',
      width: 150,
      type: 'date',
    },
  ];

  return (
    <>
      <OrderStatusGrid />
      <Paper sx={{ height: 400, width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
          getRowId={(row) => row.order_id}
        />
      </Paper>
    </>
  );
}
