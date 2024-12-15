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
import PaginationControlled from '@/_components/Pagination';
import { debounce } from 'lodash';

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

const DEFAULT_PAGE_SIZE = 10;

const VoucherData: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vouchers } = useSelector((state: RootState) => state.voucher);
  const { currentPage, totalPages } = useSelector(
    (state: RootState) => state.voucher.pagination
  );

  const [modalState, setModalState] =
    React.useState<ModalState>(INITIAL_MODAL_STATE);
  const [pageSize, setPageSize] = React.useState(DEFAULT_PAGE_SIZE);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [currentPageLocal, setCurrentPageLocal] = React.useState(currentPage);

  const debouncedSearch = React.useCallback(
    debounce((value: string) => {
      dispatch(
        fetchVouchers({
          page: 1,
          limit: pageSize,
          name: value || undefined,
        })
      );
    }, 300),
    [dispatch, pageSize]
  );

  React.useEffect(() => {
    dispatch(
      fetchVouchers({
        page: currentPageLocal,
        limit: pageSize,
        name: searchTerm || undefined,
      })
    );
  }, [dispatch, currentPageLocal, pageSize, searchTerm]);

  const sanitizedVouchers = React.useMemo(
    () =>
      vouchers.map((voucher, index) => ({
        ...voucher,
        id: voucher._id || voucher.code || `row-${index}`,
      })),
    [vouchers]
  );

  const handleChangePage = (newPage: number) => {
    setCurrentPageLocal(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setPageSize(newRowsPerPage);
    setCurrentPageLocal(1); // Reset to first page when changing rows per page
  };

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

  const handleSearch = (searchValue: string) => {
    setSearchTerm(searchValue);
    setCurrentPageLocal(1); // Reset to first page when searching
    debouncedSearch(searchValue);
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
      <Paper sx={{ width: '100%', p: 2 }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
          mb={2}
        >
          <SearchBar searchType="voucher" onSearch={handleSearch} />
          <ActionButtons onAdd={handleAdd} add />
        </Box>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={sanitizedVouchers}
            columns={columns}
            checkboxSelection
            disableRowSelectionOnClick
            hideFooter
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '24px',
          }}
        >
          <PaginationControlled
            count={totalPages}
            page={currentPageLocal}
            rowsPerPage={pageSize}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
      <VoucherGrid searchTerm={searchTerm} currentPage={currentPageLocal} />

      <CouponModal
        open={modalState.open}
        onClose={handleCloseModal}
        voucher={modalState.selectedVoucher}
        mode={modalState.mode}
      />
    </>
  );
};

export default VoucherData;
