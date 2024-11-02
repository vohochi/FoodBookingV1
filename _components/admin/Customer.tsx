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

export default function Customer() {
  const [rows, setRows] = React.useState<IUser[]>(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<IUser | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit' | 'view'>(
    'add'
  );

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

  const handleDelete = (row: IUser) => {
    setSelectedRow(row);
    setFormType('view');
    setOpenModal(true);
  };

  const handleDetail = (row: IUser) => {
    setSelectedRow(row);
    setFormType('view');
    setOpenModal(true);
  };

  const handleLock = (row: IUser) => {
    setRows(
      rows.map((r) => {
        if (r.id === row.id) {
          return { ...r, is_locked: !r.is_locked };
        }
        return r;
      })
    );
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
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 280,
      renderCell: (params) => (
        <ActionButtons
          onEdit={() => handleEdit(params.row)}
          onDelete={() => handleDelete(params.row.id)}
          onLock={() => handleLock(params.row)}
          isLocked={params.row.is_locked} // Truyền trạng thái khóa
          onDetails={() => handleDetail(params.row)}
          edit
          lock
          delete
          detail
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
