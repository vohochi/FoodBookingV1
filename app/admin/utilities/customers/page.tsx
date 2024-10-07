// CustomerTable.tsx
'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchField from '@/app/_components/Search';
import FilterButton from '@/app/_components/FilterButton';
import AddEditModal from '@/app/_components/AddEditModal';
import ActionButtons from '@/app/_components/ActionButtons';
import { Customer } from '@/app/types/Customer';

const initialRows: Customer[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0123456789',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    phone: '0987654321',
    createdAt: '2024-01-02',
  },
  // Thêm dữ liệu khác nếu cần...
];

export default function CustomerTable() {
  const [rows, setRows] = React.useState<Customer[]>(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Customer | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');

  const handleEdit = (row: Customer) => {
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

  const handleSubmit = (newCustomer: Customer) => {
    if (formType === 'add') {
      setRows([...rows, newCustomer]);
    } else {
      setRows(
        rows.map((row) => (row.id === newCustomer.id ? newCustomer : row))
      );
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã Khách Hàng',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Tên Khách Hàng',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250,
    },
    {
      field: 'phone',
      headerName: 'Số Điện Thoại',
      width: 150,
    },
    {
      field: 'createdAt',
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
          edit
          delete
        />
      ),
    },
  ];

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
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />

      <AddEditModal
        open={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
        initialData={selectedRow}
        formType={formType}
        type="customer" // Đặt thành 'customer'
      />
    </Paper>
  );
}
