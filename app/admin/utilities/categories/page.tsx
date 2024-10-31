'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ActionButtons from '@/_components/ActionButtons';
import { Category } from '@/types/Category'; // Import kiểu dữ liệu Category
import SearchBar from '@/_components/Search';
import CategoryGrid from '@/_components/TopCategories';
import CategoryForm from '@/_components/modalForm/CategoryForm'; // Import Categ_components/modalForm/CategoryFormoryForm
import Image from 'next/image';

const initialRows: Category[] = [
  {
    category_id: '1',
    name: 'Đồ Ăn',
    description: 'Món ăn ngon miệng và đa dạng.',
    createdAt: new Date('2024-01-01'), // Ngày tạo
    updateAt: new Date('2024-01-01'), // Ngày cập nhật
    img: 'http://localhost:3002/images/anh1.png', // URL ảnh
  },
  {
    category_id: '2',
    name: 'Đồ Uống',
    description: 'Nước giải khát tươi mát và thơm ngon.',
    createdAt: new Date('2024-01-02'), // Ngày tạo
    updateAt: new Date('2024-01-02'), // Ngày cập nhật
    img: 'http://localhost:3002/images/anh23.png', // URL ảnh
  },
  {
    category_id: '3',
    name: 'Tráng Miệng',
    description: 'Các món tráng miệng ngọt ngào.',
    createdAt: new Date('2024-01-03'), // Ngày tạo
    updateAt: new Date('2024-01-03'), // Ngày cập nhật
    img: 'http://localhost:3002/images/anh52.png', // URL ảnh
  },
  {
    category_id: '4',
    name: 'Tráng Miệng',
    description: 'Các món tráng miệng ngọt ngào.',
    createdAt: new Date('2024-01-03'), // Ngày tạo
    updateAt: new Date('2024-01-03'), // Ngày cập nhật
    img: 'http://localhost:3002/images/anh32.png', // URL ảnh
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

  const handleDelete = (id: string) => {
    setRows(rows.filter((row) => row.category_id !== id));
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleSubmit = async (newCategory: Category): Promise<void> => {
    return new Promise<void>((resolve) => {
      if (formType === 'add') {
        // Generate a new _id for the new category
        const newId = Math.random().toString(36).substring(2, 15);
        setRows([...rows, { ...newCategory, category_id: newId }]);
      } else {
        setRows(
          rows.map((row) =>
            row.category_id === newCategory.category_id ? newCategory : row
          )
        );
      }
      handleCloseModal();
      resolve();
    });
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên Thể Loại',
      width: 200,
      renderCell: (params) => (
        <Image
          src={params.row.img}
          alt={params.row.name}
          width={50}
          height={50}
        />
      ),
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
      field: 'updateAt',
      headerName: 'Ngày Cập Nhật',
      width: 150,
    },

    {
      field: 'actions',
      headerName: 'Hành Động',
      width: 150,
      renderCell: (params) => (
        <ActionButtons
          onEdit={() => handleEdit(params.row)}
          onDelete={() => handleDelete(params.row.category_id)}
          edit
          delete
        />
      ),
    },
  ];

  return (
    <>
      <CategoryGrid categories={rows} /> {/* Truyền 4 categories đầu tiên */}
      <Paper sx={{ height: 400, width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.category_id} // Sử dụng `category_id` làm `id`
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
        <CategoryForm
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
