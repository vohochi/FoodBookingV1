'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CustomerForm from '@/_components/modalForm/CustomerForm'; // Đảm bảo rằng component này được định nghĩa đúng
import ActionButtons from '@/_components/ActionButtons';
import { IUser } from '@/types/User'; // Nhập giao diện User
import SearchBar from '@/_components/Search';
import CustomerGrid from '@/_components/CustomerTop';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux'; // Nhập các hook của Redux
import { selectUsers } from '@/store/selector/userSelector';

export default function Customer() {
  const users = useSelector(selectUsers); // Chọn người dùng từ Redux store
  const [rows, setRows] = React.useState<IUser[]>(users); // Khởi tạo trạng thái với người dùng từ store
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<IUser | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit' | 'view'>(
    'add'
  );

  // Cập nhật rows mỗi khi users trong store thay đổi
  React.useEffect(() => {
    setRows(users);
  }, [users]);

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
    // Thực hiện chức năng khóa nếu cần
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleSubmit = (newUser: IUser) => {
    if (formType === 'add') {
      // Thực hiện chức năng thêm
      toast.success('Thêm khách hàng thành công!');
      // Cập nhật state rows nếu cần
      setRows((prevRows) => [...prevRows, newUser]); // Giả sử newUser đã có ID
    } else {
      // Thực hiện chức năng chỉnh sửa
      toast.success('Chỉnh sửa khách hàng thành công!');
      // Cập nhật state rows nếu cần
      setRows((prevRows) =>
        prevRows.map((row) => (row.id === newUser.id ? newUser : row))
      );
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
          rows={rows} // Thêm dòng này
          setRows={setRows} // Thêm dòng này
        />
      </Paper>
    </>
  );
}
