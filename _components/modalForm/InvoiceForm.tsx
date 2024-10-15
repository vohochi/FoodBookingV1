// app/modalForm/InvoicesForm.tsx
import * as React from 'react';
import {
  Button,
  TextField,
  Typography,
  Divider,
  Box,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Invoice } from '@/types/Invoices'; // Import Invoice interface

interface InvoiceFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Invoice | null; // Dữ liệu ban đầu cho chỉnh sửa
  formType: 'add' | 'edit'; // Loại form (thêm hoặc chỉnh sửa)
  onSubmit: (data: Invoice) => void; // Hàm xử lý khi submit form
}

export default function InvoiceForm({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
}: InvoiceFormProps) {
  const [invoice_id, setInvoiceId] = React.useState(
    initialData?.invoice_id || 0
  );
  const [order_id, setOrderId] = React.useState(initialData?.order_id || 0);
  const [payment_method, setPaymentMethod] = React.useState(
    initialData?.payment_method || ''
  );
  const [payment_status, setPaymentStatus] = React.useState(
    initialData?.payment_status || 'pending'
  );
  const [due_date, setDueDate] = React.useState(
    initialData?.due_date || new Date()
  );

  const handleSubmit = () => {
    const newInvoice: Invoice = {
      invoice_id: initialData?.invoice_id || Date.now(),
      order_id,
      payment_method,
      payment_status,
      due_date,
      created_at: new Date().toISOString(),
    };
    onSubmit(newInvoice);
    onClose(); // Đóng modal sau khi submit
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflow: 'hidden',
          maxHeight: '80vh',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom textAlign="center">
          {formType === 'add' ? 'Thêm Hóa Đơn' : 'Chỉnh Sửa Hóa Đơn'}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="normal"
            label="Mã Hóa Đơn"
            fullWidth
            variant="outlined"
            value={invoice_id}
            onChange={(e) => setInvoiceId(Number(e.target.value))}
            disabled={formType === 'edit'}
          />
          <TextField
            margin="normal"
            label="Mã Đơn Hàng"
            fullWidth
            variant="outlined"
            type="number"
            value={order_id}
            onChange={(e) => setOrderId(Number(e.target.value))}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="payment-method-label">
              Phương thức thanh toán
            </InputLabel>
            <Select
              labelId="payment-method-label"
              id="payment-method"
              value={payment_method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="cash">Tiền mặt</MenuItem>
              <MenuItem value="card">Thẻ tín dụng</MenuItem>
              {/* Add more payment methods here */}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="payment-status-label">
              Trạng thái thanh toán
            </InputLabel>
            <Select
              labelId="payment-status-label"
              id="payment-status"
              value={payment_status}
              onChange={(e) => setPaymentStatus(e.target.value)}
            >
              <MenuItem value="pending">Chờ xử lý</MenuItem>
              <MenuItem value="completed">Hoàn thành</MenuItem>
              <MenuItem value="failed">Thất bại</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="normal"
            label="Ngày đến hạn"
            fullWidth
            variant="outlined"
            type="date"
            value={due_date.toISOString().slice(0, 10)} // Format date for input
            onChange={(e) => setDueDate(new Date(e.target.value))}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {formType === 'add' ? 'Thêm' : 'Lưu'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
