'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CustomerForm from '@/_components/modalForm/CustomerForm'; // Import CustomerForm
import ActionButtons from '@/_components/ActionButtons';
import { IUser } from '@/types/User'; // Import User interface
import SearchBar from '@/_components/Search';
import CustomerGrid from '@/_components/CustomerTop';

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

  const handleEdit = (row: IUser) => {
    setSelectedRow(row);
    setFormType('edit');
    setOpenModal(true);
  };

  const handleAdd = () => {
    setSelectedRow(null);
    setFormType('add');
    setOpenModal(true);
  };

  const handleDelete = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleSubmit = (newUser: IUser) => {
    if (formType === 'add') {
      const newId = Math.max(0, ...rows.map((row) => row.id ?? 0)) + 1; // Use `?? 0` to handle `undefined` values
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
      width: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'phone_number',
      headerName: 'Số điện thoại',
      width: 150,
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      width: 200,
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
      width: 100,
      type: 'date',
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 150,
      renderCell: (params) => (
        <ActionButtons
          onEdit={() => handleEdit(params.row)}
          onDelete={() => handleDelete(params.row.id)}
          edit
          delete
        />
      ),
    },
  ];

  return (
    <>
      <CustomerGrid />
      <Paper sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <Box sx={{ height: 'auto' }}>
          {' '}
          {/* Wrap DataGrid in Box */}
          <DataGrid
            rows={rows}
            columns={columns}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            sx={{ border: 0, width: '100%', overflowX: 'auto' }} // Add overflowX: 'auto'
          />
        </Box>

        <CustomerForm // Use CustomerForm component
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
