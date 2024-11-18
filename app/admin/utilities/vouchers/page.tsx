// src/components/DataTable.tsx
'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import CustomerForm from '@/_components/modalForm/CustomerForm'; // Import CustomerForm
import ActionButtons from '@/_components/ActionButtons';
import SearchBar from '@/_components/Search';
import VoucherGrid from '@/_components/VoucherTop';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store'; // Assuming this is where your root reducer is combined
import { addVoucher, fetchVouchers, modifyVoucher } from '@/store/slice/voucherSlice';
import { Voucher } from '@/types/Voucher';

const DataTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vouchers = useSelector((state: RootState) => state.voucher); // Get vouchers from the store
console.log(vouchers)
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<any | null>(null);
  const [formType, setFormType] = React.useState<'add' | 'edit'>('add');

  React.useEffect(() => {
    dispatch(fetchVouchers({ page: 1, limit: 10 })); // Giới hạn số lượng vouchers bạn muốn tải
  }, [dispatch]);
  const handleAdd = () => {
    setSelectedRow(null);
    setFormType('add');
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRow(null);
  };

  const handleSubmit = (newVoucher: Voucher) => {
    if (formType === 'add') {
      dispatch(addVoucher(newVoucher));
    } else {
      // dispatch(modifyVoucher(newVoucher) as any) ;
    }
    handleCloseModal();
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên voucher',
      width: 120,
    },
    {
      field: 'code',
      headerName: 'Mã voucher',
      width: 150,
    },
    {
      field: 'discount_percent',
      headerName: 'Giảm giá (%)',
      width: 120,
    },
    {
      field: 'start',
      headerName: 'Ngày bắt đầu',
      width: 150,
      type: 'date',
    },
    {
      field: 'end',
      headerName: 'Ngày kết thúc',
      width: 150,
      type: 'date',
    },
    {
      field: 'limit',
      headerName: 'Giới hạn',
      width: 100,
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 150,
      type: 'date',
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày cập nhật',
      width: 150,
      type: 'date',
    },
  ];

  return (
    <>
      <VoucherGrid />
      <Paper sx={{ width: '100%' }}>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <SearchBar />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <Box sx={{ height: 'auto' }}>
          <DataGrid
            hideFooter
            rows={vouchers}
            columns={columns}
            checkboxSelection
            sx={{ border: 0, width: '100%', overflowX: 'auto' }}
          />
        </Box>

        {/* <CustomerForm
          open={openModal}
          onClose={handleCloseModal}
          // onSubmit={handleSubmit}
          initialData={selectedRow}
          formType={formType}
          // rows={vouchers}
          setRows={() => {}} // Set rows is not needed since Redux is handling state
        /> */}
      </Paper>
    </>
  );
};

export default DataTable;
