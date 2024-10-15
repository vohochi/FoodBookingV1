'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import AddEditModal from '@/_components/AddEditModal';
import ActionButtons from '@/_components/ActionButtons';
import { Variant } from '@/types/Variant'; // Import kiểu dữ liệu Variant
import SearchBar from '@/_components/Search';

const initialRows: Variant[] = [
  {
    variant_id: 1,
    menu_id: 1,
    size: 'Small',
    price: 5.99,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    variant_id: 2,
    menu_id: 2,
    size: 'Medium',
    price: 7.99,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    variant_id: 3,
    menu_id: 3,
    size: 'Large',
    price: 9.99,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
  },
  // Thêm dữ liệu khác nếu cần...
];

export default function DataTable() {
  const [rows, setRows] = React.useState<Variant[]>(initialRows);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Variant | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');

  const handleEdit = (row: Variant) => {
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
    setRows(rows.filter((row) => row.variant_id !== id));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleSubmit = (newVariant: Variant) => {
    if (formType === 'add') {
      setRows([...rows, newVariant]);
    } else {
      setRows(
        rows.map((row) =>
          row.variant_id === newVariant.variant_id ? newVariant : row
        )
      );
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    {
      field: 'variant_id',
      headerName: 'Mã Biến Thể',
      width: 150,
    },
    {
      field: 'menu_id',
      headerName: 'Mã Menu',
      width: 150,
    },
    {
      field: 'size',
      headerName: 'Kích Cỡ',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Giá',
      width: 150,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày Tạo',
      width: 150,
      // valueGetter: (params) =>
      //   params.row.createdAt ? params.row.createdAt.toLocaleDateString() : '',
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày Cập Nhật',
      width: 150,
      // valueGetter: (params) =>
      //   params.row.updatedAt ? params.row.updatedAt.toLocaleDateString() : '',
    },
    {
      field: 'actions',
      headerName: 'Hành Động',
      width: 150,
      renderCell: (params) => (
        <ActionButtons
          onEdit={() => handleEdit(params.row)}
          onDelete={() => handleDelete(params.row.variant_id)}
          edit
          delete
        />
      ),
    },
  ];

  return (
    <>
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
          getRowId={(row) => row.variant_id} // Use variant_id as the ID
        />

        <AddEditModal
          open={openModal}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={selectedRow}
          formType={formType}
          formVariant={true} // Đánh dấu là form cho Variant
        />
      </Paper>
    </>
  );
}
