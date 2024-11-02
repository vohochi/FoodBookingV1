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
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: IUser | null; // Dữ liệu ban đầu cho chỉnh sửa
  formType: 'add' | 'edit' | 'view'; // Loại form (thêm, chỉnh sửa hoặc xem)
  onSubmit: (data: IUser) => void; // Hàm xử lý khi submit form
}

export default function CustomerForm({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: initialData || {
      id: Date.now(),
      full_name: '',
      email: '',
      password: '',
      phone_number: '',
      address: '',
      role: 'customer',
      createdAt: new Date(), // Use a Date object here
    },
  });

  // Set initial values for editing
  React.useEffect(() => {
    if (initialData) {
      setValue('full_name', initialData.full_name);
      setValue('email', initialData.email);
      setValue('password', initialData.password);
      setValue('phone_number', initialData.phone_number);
      setValue('address', initialData.address);
      setValue('role', initialData.role);
    }
  }, [initialData, setValue]);

  const handleFormSubmit = (data: IUser) => {
    // Show success toast
    toast.success(`${formType === 'add' ? 'Thêm' : 'Chỉnh sửa'} thành công!`);
    onSubmit(data);
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
          {formType === 'add'
            ? 'Thêm Khách Hàng'
            : formType === 'edit'
            ? 'Chỉnh Sửa Khách Hàng'
            : 'Xem Thông Tin Khách Hàng'}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <TextField
            margin="normal"
            label="Họ và tên"
            fullWidth
            variant="outlined"
            disabled={formType === 'view'}
            {...register('full_name', { required: 'Họ và tên là bắt buộc' })}
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
          />
          <TextField
            margin="normal"
            label="Email"
            fullWidth
            variant="outlined"
            disabled={formType === 'view'}
            {...register('email', {
              required: 'Email là bắt buộc',
              pattern: { value: /^\S+@\S+$/, message: 'Email không hợp lệ' },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            label="Mật khẩu"
            fullWidth
            variant="outlined"
            type="password"
            disabled={formType === 'view'}
            {...register('password', {
              required: formType !== 'view' && 'Mật khẩu là bắt buộc',
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            margin="normal"
            label="Số điện thoại"
            fullWidth
            variant="outlined"
            disabled={formType === 'view'}
            {...register('phone_number', {
              required: 'Số điện thoại là bắt buộc',
            })}
            error={!!errors.phone_number}
            helperText={errors.phone_number?.message}
          />
          <TextField
            margin="normal"
            label="Địa chỉ"
            fullWidth
            variant="outlined"
            disabled={formType === 'view'}
            {...register('address', { required: 'Địa chỉ là bắt buộc' })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            margin="normal"
            label="Vai trò"
            fullWidth
            variant="outlined"
            select
            SelectProps={{ native: true }}
            disabled={formType === 'view'}
            {...register('role')}
          >
            <option value="customer">Khách hàng</option>
            <option value="admin">Quản trị viên</option>
          </TextField>
          {formType !== 'view' && (
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>
                Hủy
              </Button>
              <Button variant="contained" color="primary" type="submit">
                {formType === 'add' ? 'Thêm' : 'Lưu'}
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
