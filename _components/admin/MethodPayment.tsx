'use client';

import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridPaginationModel,
} from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import SearchBar from '@/_components/Search';
// import CustomerGrid from '@/_components/CustomerTop';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPaymentMethods,
  removePaymentMethod,
} from '@/store/slice/paymentMethodSlice';
// import PaginationControlled from '../Pagination';
import ActionButtons from '../ActionButtons';
import { IPaymentMethod } from '@/types/PaymentMethod';
import toast from 'react-hot-toast';
import { AppDispatch } from '@/store';
import PaymentMethodForm from '@/_components/modalForm/PaymentMethodForm';
import {
  selectPaymentMethods,
  // selectTotalPages,
  selectLoading,
} from '@/store/selector/paymentMethodSelector';

type FormType = 'add' | 'edit' | 'view';

export default function PaymentMethod() {
  const dispatch = useDispatch<AppDispatch>();

  const paymentMethods = useSelector(selectPaymentMethods);
  // const totalPages = useSelector(selectTotalPages);
  console.log(paymentMethods);
  const loading = useSelector(selectLoading);

  const [rows, setRows] = React.useState<GridRowsProp>(paymentMethods);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
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

  // Thêm hàm handleChangeRowsPerPage
  // const handleChangeRowsPerPage = (newRowsPerPage: number) => {
  //   setPageSize(newRowsPerPage);
  //   setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi số lượng hàng
  // };

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
      try {
        await dispatch(removePaymentMethod(id));
        toast.success('Xóa phương thức thanh toán thành công!');
      } catch (error) {
        toast.error('Lỗi khi xóa phương thức thanh toán!');
        console.log(error);
      }
    }
    dispatch(fetchPaymentMethods({ page: 1, limit: 9 }));
  };

  const handleSubmit = async (
    newPaymentMethod: IPaymentMethod
  ): Promise<void> => {
    console.log(newPaymentMethod);
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
      {/* <CustomerGrid /> */}
      <Paper sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <Box sx={{ height: 600 }}>
          <DataGrid
            rows={rows}
            getRowId={(row) =>
              row._id || row.name || Math.random().toString(36).substr(2, 9)
            }
            columns={columns}
            paginationModel={{
              page: currentPage - 1,
              pageSize: pageSize,
            }}
            onPaginationModelChange={(paginationModel: GridPaginationModel) => {
              setCurrentPage(paginationModel.page + 1);
              setPageSize(paginationModel.pageSize);
            }}
            loading={loading}
            sx={{ border: 0, width: '100%', overflowX: 'hidden' }}
          />
          {/* <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '24px',
            }}
          >
            <PaginationControlled
              page={currentPage}
              count={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
              rowsPerPage={pageSize}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Box> */}
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
