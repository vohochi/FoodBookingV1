// app/modalForm/CustomerForm.tsx
import * as React from 'react';
import {
  Button,
  TextField,
  Typography,
  Divider,
  Box,
  Modal,
} from '@mui/material';
import { IUser } from '@/types/User'; // Import User interface

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: IUser | null; // Dữ liệu ban đầu cho chỉnh sửa
  formType: 'add' | 'edit'; // Loại form (thêm hoặc chỉnh sửa)
  onSubmit: (data: IUser) => void; // Hàm xử lý khi submit form
}

export default function CustomerForm({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
}: CustomerFormProps) {
  const [full_name, setFullName] = React.useState(initialData?.full_name || '');
  const [email, setEmail] = React.useState(initialData?.email || '');
  const [password, setPassword] = React.useState(initialData?.password || '');
  const [phone_number, setPhoneNumber] = React.useState(
    initialData?.phone_number || ''
  );
  const [address, setAddress] = React.useState(initialData?.address || '');
  const [role, setRole] = React.useState(initialData?.role || 'customer');

  const handleSubmit = () => {
    const newUser: IUser = {
      id: initialData?.id || Date.now(),
      full_name,
      email,
      password,
      phone_number,
      address,
      role,
      createdAt: new Date('2023-10-26T10:00:00Z'), // Đúng, chuyển đổi chuỗi thành Date
      // createdAt: new Date('2023-10-26T10:00:00Z'), // Đúng, chuyển đổi chuỗi thành Date
    };
    onSubmit(newUser);
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
          {formType === 'add' ? 'Thêm Khách Hàng' : 'Chỉnh Sửa Khách Hàng'}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="normal"
            label="Họ và tên"
            fullWidth
            variant="outlined"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Số điện thoại"
            fullWidth
            variant="outlined"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Địa chỉ"
            fullWidth
            variant="outlined"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Vai trò"
            fullWidth
            variant="outlined"
            select
            SelectProps={{ native: true }}
            value={role}
            onChange={(e) => {
              if (e.target.value === 'customer' || e.target.value === 'admin') {
                setRole(e.target.value);
              }
            }}
          >
            <option value="customer">Khách hàng</option>
            {/* Add more roles if needed */}
          </TextField>
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
