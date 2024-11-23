'use client';

import * as React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchBar from '@/_components/Search';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPaymentMethods,
  removePaymentMethod,
} from '@/store/slice/paymentMethodSlice';
import ActionButtons from '../ActionButtons';
import { IPaymentMethod } from '@/types/PaymentMethod';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '@/store';
import PaymentMethodForm from '@/_components/modalForm/PaymentMethodForm';
import {
  selectPaymentMethods,
  selectLoading,
} from '@/store/selector/paymentMethodSelector';
import PaginationControlled from '@/_components/Pagination';

type FormType = 'add' | 'edit' | 'view';

export default function PaymentMethod() {
  const dispatch = useDispatch<AppDispatch>();

  const paymentMethods = useSelector(selectPaymentMethods);
  const { totalPages } = useSelector((state: RootState) => state.payment);
  const loading = useSelector(selectLoading);

  const [rows, setRows] = React.useState<GridRowsProp>(paymentMethods);
  const [pageSize, setPageSize] = React.useState<number>(10); // Số hàng mỗi trang
  const [currentPage, setCurrentPage] = React.useState<number>(1); // Trang hiện tại
  const [openForm, setOpenForm] = React.useState<boolean>(false);
  const [formType, setFormType] = React.useState<FormType>('add');
  const [initialData, setInitialData] = React.useState<IPaymentMethod | null>(
    null
  );

  // Fetch payment methods when page or pageSize changes
  React.useEffect(() => {
    dispatch(fetchPaymentMethods({ page: currentPage, limit: pageSize }));
  }, [dispatch, currentPage, pageSize]);

  React.useEffect(() => {
    setRows(paymentMethods);
  }, [paymentMethods]);

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage); // Cập nhật trang hiện tại
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setPageSize(newRowsPerPage); // Update the pageSize state
    dispatch(fetchPaymentMethods({ page: currentPage, limit: newRowsPerPage }));
  };

  const handleEdit = (row: IPaymentMethod) => {
    setInitialData(row);
    setFormType('edit');
    setOpenForm(true);
  };

  const handleDetails = (row: IPaymentMethod) => {
    setInitialData(row);
    setFormType('view');
    setOpenForm(true);
  };

  const handleAdd = () => {
    setFormType('add');
    setOpenForm(true);
  };

  const handleDelete = async (id: string) => {
    if (
      window.confirm('Bạn có chắc chắn muốn xóa phương thức thanh toán này?')
    ) {
      await dispatch(removePaymentMethod(id));
      toast.success('Xóa phương thức thanh toán thành công!');
    }
    dispatch(fetchPaymentMethods({ page: currentPage, limit: pageSize }));
  };

  const handleSubmit = async (): Promise<void> => {
    if (formType === 'add') {
      toast.success('Thêm phương thức thanh toán thành công!');
    } else if (formType === 'edit') {
      toast.success('Cập nhật phương thức thanh toán thành công!');
    }
    setOpenForm(false);
  };

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Tên phương thức', width: 120 },
    { field: 'type', headerName: 'Loại', width: 120 },
    { field: 'status', headerName: 'Trạng thái', width: 100 },
    { field: 'description', headerName: 'Mô tả', width: 170 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 110 },
    { field: 'updatedAt', headerName: 'Ngày cập nhật', width: 110 },
    {
      field: 'actions',
      headerName: 'Hành động',
      width: 320,
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
      <Paper sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <Box sx={{ height: 600 }}>
          <DataGrid
            rows={rows}
            getRowId={(row) =>
              row._id || Math.random().toString(36).substr(2, 9)
            }
            columns={columns}
            hideFooter
            loading={loading}
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
            page={currentPage}
            rowsPerPage={pageSize}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>

      {openForm && (
        <PaymentMethodForm
          open={openForm}
          formType={formType}
          initialData={initialData}
          onClose={() => setOpenForm(false)}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}
