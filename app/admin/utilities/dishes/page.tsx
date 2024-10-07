// DataTable.tsx
'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchField from '@/_components/Search';
import FilterButton from '@/_components/FilterButton';
import AddEditModal from '@/_components/AddEditModal';
import ActionButtons from '@/_components/ActionButtons';
import { Dish } from '@/types/Dish';

const initialRows: Dish[] = [
  {
    id: 1,
    name: 'Pizza',
    price: 150.0,
    available: true,
    dateAdded: '2024-01-01',
    description: 'Món pizza thơm ngon với phô mai và các loại topping.',
    imageUrl: 'https://example.com/images/pizza.jpg',
    preparationTime: '30 phút',
    ingredients: ['Bột mì', 'Phô mai', 'Xúc xích', 'Ớt chuông'],
    category: 'Đồ Ăn',
  },
  // Thêm dữ liệu khác...
];

export default function DataTable() {
  const [rows, setRows] = React.useState<Dish[]>(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Dish | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');

  const handleEdit = (row: Dish) => {
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

  const handleSubmit = (newDish: Dish) => {
    if (formType === 'add') {
      setRows([...rows, newDish]);
    } else {
      setRows(rows.map((row) => (row.id === newDish.id ? newDish : row)));
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Mã Món Ăn',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Tên Món Ăn',
      width: 200,
    },
    {
      field: 'price',
      headerName: 'Giá',
      width: 150,
      type: 'number',
      valueFormatter: (params) => `${params?.value} VNĐ`,
    },
    {
      field: 'available',
      headerName: 'Có sẵn',
      width: 150,
      renderCell: (params) => (params.value ? 'Có' : 'Không'), // Chuyển đổi giá trị boolean thành văn bản
    },
    {
      field: 'dateAdded',
      headerName: 'Ngày Thêm',
      width: 150,
    },
    {
      field: 'category',
      headerName: 'Thể Loại',
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
        type="dish" // Hoặc "dish" tùy vào trang
      />
    </Paper>
  );
}
