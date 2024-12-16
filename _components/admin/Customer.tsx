'use client';

import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridRowId,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchBar from '@/_components/Search';
import CustomerGrid from '@/_components/CustomerTop';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUsers,
  selectUsersPagination,
  // selectUsersError,
} from '@/store/selector/userSelector';
import { fetchUsers, removeUser } from '@/store/slice/userSlice';
import PaginationControlled from '../Pagination';
import ActionButtons from '../ActionButtons';
import CustomerForm from '../modalForm/CustomerForm';
import { IUser } from '@/types/User';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '@/store';

type FormType = 'add' | 'edit' | 'view';

export default function Customer() {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);
  const { totalPages, currentPage } = useSelector(selectUsersPagination);
  const error = useSelector((state: RootState) => state.user.error);

  const [rows, setRows] = React.useState<GridRowsProp>([]);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [currentPage1, setCurrentPage] = React.useState<number>(currentPage);
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const [formType, setFormType] = React.useState<FormType>('add');
  const [initialData, setInitialData] = React.useState<IUser | null>(null);

  React.useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  React.useEffect(() => {
    if (Array.isArray(users)) {
      const validUsers = users.filter(
        (user) => user && typeof user === 'object' && '_id' in user
      );
      setRows(validUsers);
    }
  }, [users]);

  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleEdit = (row: IUser) => {
    setInitialData(row);
    setFormType('edit');
    setOpenForm(true);
  };

  const handleDetails = (row: IUser) => {
    setInitialData(row);
    setFormType('view');
    setOpenForm(true);
  };

  const handleAdd = () => {
    setInitialData(null);
    setFormType('add');
    setOpenForm(true);
  };

  const handleDelete = async (row: IUser) => {
    if (row.role === 'admin') {
      toast.error('Không được phép xóa quản trị viên');
      return;
    }

    if (row.__v) {
      toast.error('Không thể xóa khách hàng đã tạo đơn hàng');
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await dispatch(removeUser(row._id!));
        toast.success('Xóa người dùng thành công!');
        dispatch(fetchUsers({ page: currentPage, limit: pageSize }));
      } catch (error) {
        toast.error('Lỗi khi xóa người dùng!');
        console.error('Error:', error);
      }
    }
  };

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
    dispatch(fetchUsers({ page: newPage, limit: pageSize }));
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
      renderCell: (params) => {
        const isAdmin = params.row.role === 'admin';

        return (
          <ActionButtons
            edit={!isAdmin}
            delete={!isAdmin}
            detail
            onEdit={!isAdmin ? () => handleEdit(params.row) : undefined}
            onDelete={!isAdmin ? () => handleDelete(params.row) : undefined}
            onDetails={() => handleDetails(params.row)}
          />
        );
      },
    },
  ];

  return (
    <>
      <CustomerGrid />
      <Paper sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar searchType="user" />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <Box sx={{ height: 600, overflow: 'hidden' }}>
          <DataGrid
            rows={rows}
            hideFooter
            columns={columns}
            getRowId={(row) => row._id as GridRowId}
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

      <CustomerForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          dispatch(fetchUsers({ page: currentPage, limit: pageSize }));
        }}
        initialData={initialData}
        formType={formType}
      />
    </>
  );
}
