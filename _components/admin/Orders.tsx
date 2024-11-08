'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Order } from '@/types/Order';
import SearchBar from '@/_components/Search';
import OrderStatusGrid from '@/_components/TopOrders';

const initialRows: Order[] = [
  {
    order_id: '1',
    user_id: '1',
    total: 150.0,
    status: 'pending',
    payment_method: 'cash',
    payment_status: 'unpaid',
    shipping_address: '123 Main St, Hanoi',
    orderDetail: {
      menu_id: '1',
      quantity: 2,
      price: 75.0,
    },
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-05'),
  },
];

const getStatusColor = (status: string) => {
  const statusMap: {
    [key: string]: 'success' | 'warning' | 'error' | 'default';
  } = {
    completed: 'success',
    pending: 'warning',
    cancelled: 'error',
    processing: 'default',
  };
  return statusMap[status] || 'default';
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
};

export default function Orders() {
  const [rows, setOrders] = React.useState<Order[]>(initialRows); // Update here to include setOrders
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isDialogOpen, setDialogOpen] = React.useState(false);

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelPayment = (order: Order) => {
    // Ensure to specify the type
    const updatedOrder = {
      ...order,
      payment_status: 'cancelled',
    };

    // Update the orders in state
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.order_id === updatedOrder.order_id ? updatedOrder : o
      )
    );

    // Optionally, show a success message
    // toast.success(`Payment cancelled for order ID: ${order.order_id}`);
  };

  const handleConfirmPayment = (order: Order) => {
    // Ensure to specify the type
    const updatedOrder = {
      ...order,
      payment_status: 'confirmed',
    };

    // Update the orders in state
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o.order_id === updatedOrder.order_id ? updatedOrder : o
      )
    );

    // Optionally, show a success message
    // toast.success(`Payment confirmed for order ID: ${order.order_id}`);
  };

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
          label={params.value}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: 'total',
      headerName: 'Tổng Tiền',
      width: 160,
      renderCell: (params) => formatCurrency(params.value),
    },
    {
      field: 'payment_status',
      headerName: 'TT Toán',
      width: 150,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color={params.value === 'paid' ? 'success' : 'error'}
          size="small"
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Ngày Đặt',
      width: 150,
      // valueFormatter: (params) =>
      //   new Date(params?.).toLocaleDateString('vi-VN'),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 280,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleViewDetails(params.row)}
            sx={{
              borderRadius: '8px',
              padding: '6px 16px',
              textTransform: 'none',
              boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease',
              ':hover': {
                backgroundColor: '#e1e1e1',
              },
            }}
          >
            Chi tiết
          </Button>

          <Button
            variant="outlined"
            size="small"
            onClick={() => handleConfirmPayment(params.row)}
            sx={{
              borderRadius: '8px',
              padding: '6px 16px',
              textTransform: 'none',
              boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease',
              ':hover': {
                backgroundColor: '#e1e1e1',
              },
            }}
          >
            Xác nhận
          </Button>
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => handleCancelPayment(params.row)}
            disabled={params.row.payment_status !== 'unpaid'}
            sx={{
              borderRadius: '8px',
              padding: '6px 16px',
              textTransform: 'none',
              boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease',
              ':hover': {
                backgroundColor: '#e1e1e1',
              },
            }}
          >
            Hủy
          </Button>
        </Box>
      ),
    },
  ];

  return (
    <>
      <OrderStatusGrid />
      <Paper sx={{ height: 400, width: '100%', mt: 2 }}>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <SearchBar />
        </Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.order_id}
          sx={{
            '& .MuiDataGrid-row:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        />
      </Paper>

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          <Typography variant="h6">
            Chi tiết đơn hàng #{selectedOrder?.order_id}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {selectedOrder && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                {/* Thông tin đơn hàng */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Thông tin đơn hàng
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Trạng thái đơn hàng
                        </Typography>
                        <Chip
                          label={selectedOrder.status}
                          color={getStatusColor(selectedOrder.status)}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Trạng thái thanh toán
                        </Typography>
                        <Chip
                          label={selectedOrder.payment_status}
                          color={
                            selectedOrder.payment_status === 'paid'
                              ? 'success'
                              : 'error'
                          }
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Phương thức thanh toán
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedOrder.payment_method}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Địa chỉ giao hàng
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedOrder.shipping_address}
                  </Typography>
                </Grid>

                {/* Thông tin thời gian */}
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Thời gian
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Ngày đặt hàng
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {selectedOrder.createdAt.toLocaleString('vi-VN')}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      Cập nhật lần cuối
                    </Typography>
                    <Typography variant="body1">
                      {selectedOrder.updatedAt.toLocaleString('vi-VN')}
                    </Typography>
                  </Box>
                </Grid>

                {/* Chi tiết sản phẩm */}
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    Chi tiết sản phẩm
                  </Typography>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Mã sản phẩm
                        </Typography>
                        <Typography variant="body1">
                          {selectedOrder.orderDetail.menu_id}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Số lượng
                        </Typography>
                        <Typography variant="body1">
                          {selectedOrder.orderDetail.quantity}
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Đơn giá
                        </Typography>
                        <Typography variant="body1">
                          {formatCurrency(selectedOrder.orderDetail.price)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Tổng tiền */}
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" sx={{ mt: 2 }}>
                    <Typography variant="h6">
                      Tổng tiền: {formatCurrency(selectedOrder.total)}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
