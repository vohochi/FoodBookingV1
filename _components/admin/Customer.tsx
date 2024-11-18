'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchBar from '@/_components/Search';
import CustomerGrid from '@/_components/CustomerTop';
import { useSelector, useDispatch } from 'react-redux';
import { selectUsers, selectUsersPagination } from '@/store/selector/userSelector';
import { fetchUsers, removeUser } from '@/store/slice/userSlice';
import PaginationControlled from '../Pagination';
import ActionButtons from '../ActionButtons';
import CustomerForm from '../modalForm/CustomerForm';
import { IUser } from '@/types/User';
import toast from 'react-hot-toast';
import { CouponCardProps } from '../VoucherTop';

export default function Customer() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const { totalPages, currentPage } = useSelector(selectUsersPagination);
  const [rows, setRows] = React.useState(users);
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage1, setCurrentPage] = React.useState(currentPage);
  const [openForm, setOpenForm] = React.useState(false); // For opening the form modal
  const [formType, setFormType] = React.useState<'add' | 'edit' | 'view'>('add');
  const [initialData, setInitialData] = React.useState<IUser | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedCoupon, setSelectedCoupon] = React.useState<CouponCardProps | null>(
    null
  );
  const [modalMode, setModalMode] = React.useState<'edit' | 'view' | null>(null);

  // Fetch users when page or pageSize changes
  React.useEffect(() => {
    dispatch(fetchUsers({ page: currentPage1, limit: pageSize }) as any);
  }, [dispatch, currentPage1, pageSize]);

  React.useEffect(() => {
    setRows(users);
    console.log('User data:', users);
  }, [users]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleEdit = (row: any) => {
    setInitialData(row); // Set initial data for editing
    setFormType('edit');
    setOpenForm(true); // Open the form in edit mode
  };

  const handleDetails = (row: any) => {
    setInitialData(row); // Set initial data for view
    setFormType('view');
    setOpenForm(true); // Open the form in view mode
  };

  const handleAdd = () => {
    setFormType('add');
    setOpenForm(true); // Open the form in add mode
  };

  const handleDelete = async (id: string) => {
    // Confirm before deletion
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await dispatch(removeUser(id) as any);
        toast.success('Xóa danh mục thành công!');
      } catch (error) {
        toast.error('Lỗi khi xóa danh mục!');
        console.log(error);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Handle page change
  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage ); // Set the page state (1-based index)
    console.log(newPage)
    dispatch(fetchUsers({ page: newPage , limit: pageSize }) as any);
  };

  const handleSubmit = async (newCategory: IUser): Promise<void> => {
    if (formType === 'add') {
      // const newId = Math.random().toString(36).substring(2, 15);
      // dispatch({
      //   type: 'categories/add',
      //   payload: { ...newCategory, category_id: newId },
      // });
      toast.success('Thêm danh mục thành công!');
    } else {
      // dispatch({ type: 'categories/update', payload: newCategory });
      // toast.success('Cập nhật danh mục thành công!');
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    {
      field: '_id',
      headerName: '_id',
      width: 70,
    },
    {
      field: 'fullname',
      headerName: 'Họ và tên',
      width: 120,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      width: 150,
      renderCell: (params) => {
        const addressArray = params.row.address as IUser['address'];
        if (!addressArray || addressArray.length === 0) {
          return 'Chưa cập nhật';
        }
        return addressArray.map((item) => item.phone).join(', ');
      },
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      width: 160,
      renderCell: (params) => {
        const addressArray = params.row.address as IUser['address'];
        if (!addressArray || addressArray.length === 0) {
          return 'Chưa cập nhật';
        }
        return addressArray.map((item) => item.address).join(', ');
      },
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 90,
      type: 'string',
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      width: 110,
      type: 'string',
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
          onDelete={() => handleDelete(params.row._id)}
          onDetails={() => handleDetails(params.row)}
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
        <Box sx={{ height: 400 }}>
          <DataGrid
            rows={rows}
            hideFooter
            columns={columns}
            getRowId={(row) => row._id}
            paginationModel={{
              page: currentPage1 - 1, // DataGrid is 0-based indexing
              pageSize: pageSize,
            }}
            onPaginationModelChange={(paginationModel) => {
              setCurrentPage(paginationModel.page + 1); // Update the state with the new page (1-based)
              setPageSize(paginationModel.pageSize);
            }}
            sx={{ border: 0, width: '100%', overflowX: 'hidden' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '24px',
          }}
        >
          <PaginationControlled
            count={totalPages}
            page={currentPage1}
            onChangePage={handleChangePage}
            rowsPerPage={pageSize}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>

      {/* Add Customer Form Modal */}
      <CustomerForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        initialData={initialData}
        formType={formType}
        onSubmit={(data) => handleSubmit(data)} // Add form submit handler
        rows={rows}
        setRows={setRows}
      />
    </>
  );
}
