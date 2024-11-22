'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/index';
import { fetchOrders, updateOrderStatusThunk } from '@/store/slice/orderSlice';
import { Order } from '@/types/Order';
import SearchBar from '@/_components/Search';
import OrderStatusGrid from '@/_components/TopOrders';
import OrderDetailDialog from '@/_components/admin/OrderDetailDialog';
import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Slide,
  IconButton,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import toast from 'react-hot-toast';
import { formatPrice } from '@/utils/priceVN';
import PaginationControlled from '@/_components/Pagination';

// Transition cho Dialog
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Hàm lấy màu status
export const getStatusColor = (status: string) => {
  const statusMap: {
    [key: string]: 'success' | 'warning' | 'error' | 'default';
  } = {
    success: 'success',
    pending: 'warning',
    cancelled: 'error',
    processing: 'default',
  };
  return statusMap[status] || 'default';
};

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const { totalPages, currentPage, orders } = useSelector(
    (state: RootState) => state.order
  );

  // State quản lý dialogs
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isDetailDialogOpen, setDetailDialogOpen] = React.useState(false);
  const [isUpdateStatusDialogOpen, setUpdateStatusDialogOpen] =
    React.useState(false);

  // State cho form cập nhật trạng thái
  const [orderStatus, setOrderStatus] = React.useState<string>('');
  const [paymentStatus, setPaymentStatus] = React.useState<string>('');

  // Pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Fetch orders khi component mount hoặc thay đổi rows per page
  React.useEffect(() => {
    dispatch(fetchOrders({ page: 1, limit: rowsPerPage }));
  }, [dispatch, rowsPerPage]);

  // Mở dialog chi tiết đơn hàng
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  // Đóng dialog chi tiết
  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedOrder(null);
  };

  // Mở dialog cập nhật trạng thái
  const handleOpenUpdateStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setUpdateStatusDialogOpen(true);
    // Reset trạng thái
    setOrderStatus('');
    setPaymentStatus('');
  };

  // Đóng dialog cập nhật trạng thái
  const handleCloseUpdateStatusDialog = () => {
    setUpdateStatusDialogOpen(false);
    setSelectedOrder(null);
  };
  const handleDirectConfirmOrder = (order: Order) => {
    // Xác nhận đơn hàng trực tiếp khi ở trạng thái pending
    const updatedOrder = {
      orderId: order.order_id,
      status: 'processing', // Chuyển sang trạng thái đang xử lý
      payment_status: order.payment_status, // Giữ nguyên trạng thái thanh toán
    };

    // Hiển thị xác nhận trước khi cập nhật
    const confirmUpdate = window.confirm(
      `Bạn có chắc chắn xác nhận đơn hàng ${order.order_id} không?`
    );

    if (confirmUpdate) {
      dispatch(updateOrderStatusThunk(updatedOrder))
        .then(() => {
          toast.success('Đơn hàng đã được xác nhận!');
          dispatch(fetchOrders({ page: currentPage, limit: rowsPerPage }));
        })
        .catch((error) => {
          console.error(error);
          toast.error('Lỗi khi xác nhận đơn hàng!');
        });
    }
  };

  // Cập nhật trạng thái đơn hàng
  const handleUpdateOrderStatus = () => {
    if (!selectedOrder || !orderStatus || !paymentStatus) {
      toast.error('Vui lòng chọn đầy đủ trạng thái');
      return;
    }

    const updatedOrder = {
      orderId: selectedOrder.order_id,
      status: orderStatus,
      payment_status: paymentStatus,
    };

    dispatch(updateOrderStatusThunk(updatedOrder))
      .then(() => {
        toast.success(
          paymentStatus === 'success'
            ? 'Thanh toán đã được xác nhận!'
            : 'Thanh toán đã bị hủy!'
        );
        dispatch(fetchOrders({ page: 1, limit: rowsPerPage }));
        handleCloseUpdateStatusDialog();
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          paymentStatus === 'success'
            ? 'Lỗi khi xác nhận thanh toán!'
            : 'Lỗi khi hủy thanh toán!'
        );
      });
  };

  // Cấu hình cột DataGrid
  const columns: GridColDef[] = [
    {
      field: 'order_id',
      headerName: 'Mã ĐH',
      width: 100,
    },
    {
      field: 'status',
      headerName: 'Trạng Thái',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={
            params.value === 'success'
              ? 'Hoàn thành'
              : params.value === 'pending'
              ? 'Đang chờ xử lý'
              : params.value === 'cancelled'
              ? 'Đã hủy'
              : 'Đang xử lý'
          }
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'payment_status',
      headerName: 'TT Toán',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={
            params.value === 'success' ? 'Đã thanh toán' : 'Chưa thanh toán'
          }
          color={params.value === 'success' ? 'success' : 'warning'}
          size="small"
        />
      ),
    },
    {
      field: 'total',
      headerName: 'Tổng Tiền',
      width: 160,
      renderCell: (params) => formatPrice(params.value),
    },
    {
      field: 'createdAt',
      headerName: 'Ngày Đặt',
      width: 150,
      type: 'string',
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 280,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleViewDetails(params.row)}
          >
            Chi tiết
          </Button>
          {/* Chỉ hiển thị nút cập nhật khi đang ở trạng thái processing */}
          {params.row.status === 'processing' && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleOpenUpdateStatusDialog(params.row)}
            >
              Cập Nhật Trạng Thái
            </Button>
          )}
          {params.row.status === 'pending' && (
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleDirectConfirmOrder(params.row)}
            >
              Xác Nhận
            </Button>
          )}
          {/* Disable button khi trạng thái là success */}
          {params.row.status === 'success' && (
            <Button variant="outlined" size="small" disabled>
              Đã hoàn thành
            </Button>
          )}
        </Box>
      ),
    },
  ];

  // Xử lý thay đổi trang
  const handleChangePage = (newPage: number) => {
    dispatch(fetchOrders({ page: newPage + 1, limit: rowsPerPage }));
  };

  // Xử lý thay đổi số hàng mỗi trang
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    dispatch(fetchOrders({ page: 1, limit: newRowsPerPage }));
  };

  return (
    <>
      <OrderStatusGrid />
      <Paper sx={{ height: 680, width: '100%', mt: 2 }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          mb={1}
        >
          <SearchBar />
        </Box>
        <DataGrid
          sx={{ height: 500, width: '100%', mt: 2 }}
          rows={orders}
          columns={columns}
          hideFooter
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.order_id}
        />
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
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>

      {/* Dialog Chi Tiết Đơn Hàng */}
      <OrderDetailDialog
        open={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        order={selectedOrder}
      />

      {/* Dialog Cập Nhật Trạng Thái */}
      <Dialog
        open={isUpdateStatusDialogOpen}
        onClose={handleCloseUpdateStatusDialog}
        TransitionComponent={Transition}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" fontWeight="bold">
              Cập Nhật Trạng Thái Đơn Hàng
            </Typography>
            <IconButton onClick={handleCloseUpdateStatusDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          <Box mb={2}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color="text.secondary"
            >
              Mã Đơn Hàng: {selectedOrder?.order_id}
            </Typography>
          </Box>

          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel>Trạng Thái Đơn Hàng</InputLabel>
            <Select
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
              label="Trạng Thái Đơn Hàng"
              startAdornment={
                orderStatus === 'success' ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : orderStatus === 'cancelled' ? (
                  <CancelOutlinedIcon color="error" />
                ) : null
              }
            >
              <MenuItem value="success">
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircleOutlineIcon color="success" />
                  Giao Hàng Thành Công
                </Box>
              </MenuItem>
              <MenuItem value="processing">
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircleOutlineIcon color="primary" />
                  đơn hàng đang xử lý
                </Box>
              </MenuItem>
              <MenuItem value="cancelled">
                <Box display="flex" alignItems="center" gap={1}>
                  <CancelOutlinedIcon color="error" />
                  Hủy Đơn Hàng
                </Box>
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth variant="outlined">
            <InputLabel>Trạng Thái Thanh Toán</InputLabel>
            <Select
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              label="Trạng Thái Thanh Toán"
              startAdornment={
                paymentStatus === 'success' ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : paymentStatus === 'failed' ? (
                  <CancelOutlinedIcon color="error" />
                ) : null
              }
            >
              <MenuItem value="success">
                <Box display="flex" alignItems="center" gap={1}>
                  <CheckCircleOutlineIcon color="success" />
                  Đã Thanh Toán
                </Box>
              </MenuItem>
              <MenuItem value="failed">
                <Box display="flex" alignItems="center" gap={1}>
                  <CancelOutlinedIcon color="error" />
                  Chưa Thanh Toán
                </Box>
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseUpdateStatusDialog}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateOrderStatus}
            disabled={!orderStatus || !paymentStatus}
            startIcon={<CheckCircleOutlineIcon />}
          >
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
