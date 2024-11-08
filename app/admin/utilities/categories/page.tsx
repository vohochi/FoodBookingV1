'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ActionButtons from '@/_components/ActionButtons';
import { Category } from '@/types/Category';
import SearchBar from '@/_components/Search';
import CategoryGrid from '@/_components/TopCategories';
import CategoryForm from '@/_components/modalForm/CategoryForm';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  deleteCategoryThunk,
} from '@/store/slice/categorySlice';
import { selectCategories } from '@/store/selector/categoriesSelector';
import { AppDispatch } from '@/store';
import toast from 'react-hot-toast';

export default function DataTable() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);

  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<Category | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit' | 'view'>(
    'add'
  );

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  const handleDelete = async (id: string) => {
    // Sử dụng confirm để xác nhận xóa
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await dispatch(deleteCategoryThunk(id));
        toast.success('Xóa danh mục thành công!');
      } catch (error) {
        toast.error('Lỗi khi xóa danh mục!');
        console.log(error);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleDetails = (row: Category) => {
    setSelectedRow(row);
    setFormType('view');
    setOpenModal(true);
  };

  const handleSubmit = async (newCategory: Category): Promise<void> => {
    if (formType === 'add') {
      const newId = Math.random().toString(36).substring(2, 15);
      dispatch({
        type: 'categories/add',
        payload: { ...newCategory, category_id: newId },
      });
      toast.success('Thêm danh mục thành công!');
    } else {
      dispatch({ type: 'categories/update', payload: newCategory });
      toast.success('Cập nhật danh mục thành công!');
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    {
      field: 'img',
      headerName: 'Hình Ảnh',
      width: 80,
      renderCell: (params) => (
        <Image
          src={params.row.img}
          alt={params.row.name}
          width={50}
          height={50}
          style={{ borderRadius: '4px' }}
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Tên Thể Loại',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'Mô Tả',
      width: 220,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày Tạo',
      width: 150,
      renderCell: (params) => (
        <div>
          {new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(new Date(params.row.createdAt))}
        </div>
      ),
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày Cập Nhật',
      width: 150,
      renderCell: (params) => (
        <div>
          {new Intl.DateTimeFormat('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(new Date(params.row.updatedAt))}
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Hành Động',
      width: 280,
      renderCell: (params) => (
        <ActionButtons
          edit
          delete
          detail
          onEdit={() => handleEdit(params.row)}
          onDelete={() => handleDelete(params.row._id)} // Sử dụng _id
          onDetails={() => handleDetails(params.row)}
        />
      ),
    },
  ];

  return (
    <>
      <CategoryGrid categories={categories.slice(0, 4)} />
      <Paper sx={{ height: 400, width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <DataGrid
          rows={categories}
          columns={columns}
          getRowId={(row) => row._id}
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
