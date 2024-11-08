'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CustomerForm from '@/_components/modalForm/CustomerForm'; // Import CustomerForm
import ActionButtons from '@/_components/ActionButtons';
import { IUser } from '@/types/User'; // Import User interface
import SearchBar from '@/_components/Search';
import VoucherGrid from '@/_components/VoucherTop';

const initialRows: IUser[] = [
  {
    id: 1,
    full_name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    phone_number: '123-456-7890',
    address: '123 Main Street',
    role: 'customer',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-05'),
  },
  {
    id: 2,
    full_name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'password456',
    phone_number: '456-789-0123',
    address: '456 Oak Avenue',
    role: 'customer',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-05'),
  },
  // Add more sample data here...
];

export default function DataTable() {
  const [rows, setRows] = React.useState<IUser[]>(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<IUser | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');

  const handleAdd = () => {
    setSelectedRow(null);
    setFormType('add');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleSubmit = (newUser: IUser) => {
    if (formType === 'add') {
      const newId = Math.max(0, ...rows.map((row) => row.id ?? 0)) + 1;
      setRows([...rows, { ...newUser, id: newId }]);
    } else {
      setRows(rows.map((row) => (row.id === newUser.id ? newUser : row)));
    }
    handleCloseModal();
  };

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
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      width: 140,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 100,
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
      <VoucherGrid />
      <Paper sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <Box sx={{ height: 'auto' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0, width: '100%', overflowX: 'auto' }}
          />
        </Box>

        <CustomerForm
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={selectedRow}
          formType={formType}
        />
      </Paper>
    </>
  );
}
