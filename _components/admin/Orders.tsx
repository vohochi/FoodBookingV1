'use client';

import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/index';
import {
  fetchOrders,
  updateOrderStatusThunk,
} from '@/store/slice/orderSliceAdmin';
import { Order, OrderDetail } from '@/types/Order';
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
// import { formatPrice } from '@/utils/priceVN';
import PaginationControlled from '@/_components/Pagination';
import { paymentOrderStatusZalopay } from '@/_lib/orders';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { IPaymentMethod } from '@/types/PaymentMethod';
import { Menu } from '@/types/Menu';

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
    (state: RootState) => state.orderAdmin
  );
  const [searchTerm, setSearchTerm] = React.useState('');
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // State quản lý dialogs
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const [isDetailDialogOpen, setDetailDialogOpen] = React.useState(false);
  const [isUpdateStatusDialogOpen, setUpdateStatusDialogOpen] =
    React.useState(false);

  // State cho form cập nhật trạng thái
  const [orderStatus, setOrderStatus] = React.useState<string>('');
  const [paymentStatus, setPaymentStatus] = React.useState<string>('');

  // Fetch orders khi component mount hoặc thay đổi rows per page hoặc searchTerm
  React.useEffect(() => {
    dispatch(
      fetchOrders({
        page: 1,
        limit: rowsPerPage,
        filters: { search: searchTerm },
      })
    );
  }, [dispatch, rowsPerPage, searchTerm]);

  React.useEffect(() => {
    if (orders.length > 0) {
      sendPaymentStatusRequests();
    }
  }, [orders]);

  const sendPaymentStatusRequests = async () => {
    const appTransIds = orders
      .map((order) => order?.app_trans_id)
      .filter((appTransId) => appTransId != null);
    const promises = appTransIds.map(async (appTransId) => {
      try {
        const response = await paymentOrderStatusZalopay(appTransId);
        console.log(`Gửi thành công App Trans ID: ${appTransId}`, response);
      } catch (error) {
        console.error(`Lỗi khi gửi App Trans ID: ${appTransId}`, error);
      }
    });

    await Promise.all(promises);
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailDialogOpen(true);
  };

  const handleCloseDetailDialog = () => {
    setDetailDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleOpenUpdateStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setUpdateStatusDialogOpen(true);
    setOrderStatus('');
    setPaymentStatus('');
  };

  const handleCloseUpdateStatusDialog = () => {
    setUpdateStatusDialogOpen(false);
    setSelectedOrder(null);
  };

  const handleDirectConfirmOrder = (order: Order) => {
    const updatedOrder = {
      orderId: order.order_id,
      status: 'processing',
      payment_status: order.payment_status,
    };

    const confirmUpdate = window.confirm(
      `Bạn có chắc chắn xác nhận đơn hàng ${order.order_id} không?`
    );

    if (confirmUpdate) {
      dispatch(updateOrderStatusThunk(updatedOrder))
        .then(() => {
          toast.success('Đơn hàng đã được xác nhận!');
          dispatch(
            fetchOrders({
              page: currentPage,
              limit: rowsPerPage,
              filters: { search: searchTerm },
            })
          );
        })
        .catch((error) => {
          console.error(error);
          toast.error('Lỗi khi xác nhận đơn hàng!');
        });
    }
  };

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
        dispatch(
          fetchOrders({
            page: currentPage,
            limit: rowsPerPage,
            filters: { search: searchTerm },
          })
        );
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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    dispatch(
      fetchOrders({ page: 1, limit: rowsPerPage, filters: { search: value } })
    );
  };

  const handleChangePage = (newPage: number) => {
    dispatch(
      fetchOrders({
        page: newPage,
        limit: rowsPerPage,
        filters: { search: searchTerm },
      })
    );
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    dispatch(
      fetchOrders({
        page: 1,
        limit: newRowsPerPage,
        filters: { search: searchTerm },
      })
    );
  };
  // Hàm getMenuInfo như bạn đã định nghĩa trước đó
  const getMenuInfo = (
    menuId: string,
    menus: Menu | Menu[] | undefined
  ): { name: string; img: string; price: number } => {
    if (!menus) {
      return {
        name: 'Không có thông tin',
        img: '/path/to/default/image.jpg',
        price: 0,
      };
    }

    const menuArray = Array.isArray(menus) ? menus : [menus];
    const menu = menuArray.find((m) => m._id === menuId);

    if (menu) {
      let imgSrc: string;
      if (typeof menu.img === 'string') {
        imgSrc = menu.img;
      } else if (menu.img instanceof File) {
        imgSrc = URL.createObjectURL(menu.img);
      } else {
        imgSrc = '/path/to/default/image.jpg';
      }
      return {
        name: menu.name,
        img: imgSrc,
        price: menu.price || 0,
      };
    }
    return {
      name: 'Không có thông tin',
      img: '/path/to/default/image.jpg',
      price: 0,
    };
  };

  // Hàm định dạng giá
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const exportToPDF = (order: Order) => {
    // Tao tai lieu PDF
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFont('helvetica');

    // Bang mau voi mang co the thay doi
    const colors = {
      primary: [41, 128, 185] as [number, number, number], // Blue
      darkGray: [40, 40, 40] as [number, number, number],
      lightGray: [80, 80, 80] as [number, number, number],
      background: [250, 250, 250] as [number, number, number],
    };

    // Thiet lap trang
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 15;

    // Nen voi mau tinh te
    doc.setFillColor(...colors.background);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Tieu de voi logo va thong tin cong ty
    doc.setFontSize(24);
    doc.setTextColor(...colors.primary);
    doc.setFont('helvetica', 'bold');
    doc.text('SEPHIR & CHEESE', margin, 25, { align: 'left' });

    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.5);
    doc.line(margin, 28, pageWidth - margin, 28);

    // Tieu de hoa don
    doc.setFontSize(18);
    doc.setTextColor(...colors.darkGray);
    doc.text('HOA DON BAN HANG', margin, 40, { align: 'left' });

    // Chi tiet don hang
    doc.setFontSize(12);
    doc.setTextColor(...colors.lightGray);
    doc.text(`Ma don hang: #${order.order_id}`, margin, 50);
    doc.text(
      `Ngay dat: ${
        order.createdAt
          ? new Date(order.createdAt).toLocaleString('vi-VN')
          : 'N/A'
      }`,
      margin,
      57
    );
    doc.text(
      `Trang thai: ${order.status === 'success' ? 'Hoan thanh' : order.status}`,
      margin,
      64
    );

    // Chi tiet thanh toan
    const paymentMethod = Array.isArray(order.payment_method)
      ? order.payment_method.map((pm: IPaymentMethod) => pm.name).join(', ')
      : (order.payment_method as IPaymentMethod).name;

    doc.text(
      `Thanh toan: ${
        order.payment_status === 'success' ? 'Da thanh toan' : 'Chua thanh toan'
      }`,
      margin,
      71
    );
    doc.text(`Phuong thuc: ${paymentMethod}`, margin, 78);

    // Thong tin khach hang
    const customerInfoX = pageWidth / 2 + 10;
    doc.setFontSize(14);
    doc.setTextColor(...colors.darkGray);
    doc.text('Thong tin khach hang', customerInfoX, 50);

    doc.setFontSize(12);
    doc.setTextColor(...colors.lightGray);
    doc.text(`Ten: ${order.shipping_address.receiver}`, customerInfoX, 57);
    doc.text(`SDT: ${order.shipping_address.phone}`, customerInfoX, 64);
    doc.text(`Dia chi: ${order.shipping_address.address}`, customerInfoX, 71);

    // Bang san pham
    const tableColumn = [
      'STT',
      'San pham',
      'Don gia',
      'So luong',
      'Thanh tien',
    ];
    const tableRows = order.orderDetail.map(
      (item: OrderDetail, index: number) => {
        const menuInfo = getMenuInfo(item.menu_id as string, order.menu);
        return [
          index + 1,
          `${menuInfo.name}${
            item.variant_size ? ` (${item.variant_size})` : ''
          }`,
          formatPrice(item.price),
          item.quantity,
          formatPrice(item.price * item.quantity),
        ];
      }
    );

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 90,
      theme: 'striped',
      styles: {
        fontSize: 10,
        cellPadding: 3,
        overflow: 'linebreak',
        font: 'helvetica',
      },
      headStyles: {
        fillColor: colors.primary,
        textColor: 255,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: { cellWidth: 15, halign: 'center' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 40, halign: 'right' },
        3: { cellWidth: 30, halign: 'center' },
        4: { cellWidth: 40, halign: 'right' },
      },
    });

    // Tong cong va phi van chuyen
    const finalY = (doc as any).lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.setTextColor(...colors.darkGray);

    doc.text('Phi van chuyen:', pageWidth - 80, finalY + 10);
    doc.text('Tong:', pageWidth - 80, finalY + 20);

    doc.setFontSize(14);
    doc.setTextColor(...colors.primary);
    doc.text(formatPrice(order.ship), pageWidth - margin, finalY + 10, {
      align: 'right',
    });
    doc.text(formatPrice(order.total), pageWidth - margin, finalY + 20, {
      align: 'right',
    });

    // Ghi chu va danh gia
    let commentY = finalY + 35;
    if (order.message) {
      doc.setFontSize(12);
      doc.setTextColor(...colors.lightGray);
      doc.text(`Ghi chu: ${order.message}`, margin, commentY);
      commentY += 10;
    }

    // Chan trang
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Cam on quy khach da mua hang!', margin, pageHeight - 20);
    doc.text(
      'Moi thac mac xin vui long lien he: chivo241023icloud@gmail.com',
      margin,
      pageHeight - 15
    );

    // Luu PDF
    doc.save(`hoa-don-${order.order_id}.pdf`);
  };
  // export default exportToPDF;
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
      width: 350,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleViewDetails(params.row)}
          >
            Chi tiết
          </Button>
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
          {params.row.status === 'success' &&
            params.row.payment_status === 'success' && (
              <>
                <Button variant="outlined" size="small" disabled>
                  Đã hoàn thành
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => exportToPDF(params.row)}
                >
                  Xuất Hóa Đơn
                </Button>
              </>
            )}
        </Box>
      ),
    },
  ];

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
          <SearchBar searchType="order" onSearch={handleSearch} />
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
            page={currentPage + 1}
            onChangePage={handleChangePage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>

      <OrderDetailDialog
        open={isDetailDialogOpen}
        onClose={handleCloseDetailDialog}
        order={selectedOrder}
      />

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
