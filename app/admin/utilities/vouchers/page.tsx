'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Box } from '@mui/material';
import ActionButtons from '@/_components/ActionButtons';
import SearchBar from '@/_components/Search';
import VoucherGrid from '@/_components/VoucherTop';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchVouchers } from '@/store/slice/voucherSlice';
import { Voucher } from '@/types/Voucher';
import CouponModal from '@/_components/modalForm/VoucherForm';
import { string } from 'zod';

// Define types for modal state
type ModalMode = 'create' | 'edit';

interface ModalState {
  open: boolean;
  mode: ModalMode;
  selectedVoucher: Voucher | null;
}

const INITIAL_MODAL_STATE: ModalState = {
  open: false,
  mode: 'create',
  selectedVoucher: null,
};

const DataTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vouchers } = useSelector((state: RootState) => state.voucher);
  
  // Combine modal-related state into a single state object
  const [modalState, setModalState] = React.useState<ModalState>(INITIAL_MODAL_STATE);

  React.useEffect(() => {
    dispatch(fetchVouchers({ page: 1, limit: 10 }));
  }, [dispatch]);

  const handleAdd = () => {
    setModalState({
      open: true,
      mode: 'create',
      selectedVoucher: null,
    });
  };

  const handleCloseModal = () => {
    setModalState(INITIAL_MODAL_STATE);
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên voucher',
      width: 120,
      flex: 1,
    },
    {
      field: 'code',
      headerName: 'Mã voucher',
      width: 150,
      flex: 1,
    },
    {
      field: 'discount_percent',
      headerName: 'Giảm giá (%)',
      width: 120,
      type: 'number',
    },
    {
      field: 'start',
      headerName: 'Ngày bắt đầu',
      width: 150,
      type: 'string',
    },
    {
      field: 'end',
      headerName: 'Ngày kết thúc',
      width: 150,
      type: 'string',

    },
    {
      field: 'limit',
      headerName: 'Giới hạn',
      width: 100,
      type: 'number',
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 150,
      type: 'string',

    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      width: 150,
      type: 'string',

    },
  ];

  return (
    <>
      <VoucherGrid />
      <Paper sx={{ width: '100%', p: 2 }}>
        <Box 
          display="flex" 
          justifyContent="flex-end" 
          alignItems="center" 
          gap={2}
          mb={2}
        >
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={vouchers}
            columns={columns}
            getRowId={(row) => row._id}
            checkboxSelection
            disableRowSelectionOnClick
            pagination
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10, page: 0 },
              },
            }}
            sx={{
              '& .MuiDataGrid-cell:focus': {
                outline: 'none',
              },
              border: 'none',
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: 'action.hover',
              },
            }}
          />
        </Box>
      </Paper>
      <CouponModal
        open={modalState.open}
        onClose={handleCloseModal}
        coupon={modalState.selectedVoucher}
        mode='create'
      />
    </>
  );
};

export default DataTable;