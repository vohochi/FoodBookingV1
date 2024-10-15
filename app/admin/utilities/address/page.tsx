'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddEditModal from '@/_components/AddEditModal';
import ActionButtons from '@/_components/ActionButtons';
import { Category } from '@/types/Category'; // Import kiểu dữ liệu Category
import SearchBar from '@/_components/Search';

const initialRows: Category[] = [
  {
    id: 1,
    name: 'Đồ Ăn',
    description: 'Món ăn ngon miệng và đa dạng.',
    createdAt: '2024-01-01', // Ngày tạo
  },
  {
    id: 2,
    name: 'Đồ Uống',
    description: 'Nước giải khát tươi mát và thơm ngon.',
    createdAt: '2024-01-02', // Ngày tạo
  },
  {
    id: 3,
    name: 'Tráng Miệng',
    description: 'Các món tráng miệng ngọt ngào.',
    createdAt: '2024-01-03', // Ngày tạo
  },
  // Thêm dữ liệu khác nếu cần...
];

export default function DataTable() {
  const [rows, setRows] = React.useState<Category[]>(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Category | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');

  const handleEdit = (row: Category) => {
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

  const handleSubmit = (newCategory: Category) => {
    if (formType === 'add') {
      setRows([...rows, newCategory]);
    } else {
      setRows(
        rows.map((row) => (row.id === newCategory.id ? newCategory : row))
      );
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã Thể Loại',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Tên Thể Loại',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Mô Tả',
      width: 300,
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
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <SearchBar />
        <ActionButtons onAdd={handleAdd} add />
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
        formCategory={true} // Đánh dấu là form cho category
      />
    </Paper>
  );
}
