import * as React from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Modal,
  Paper,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Avatar,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IUser } from '@/types/User';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addUser } from '@/store/slice/userSlice';
import { AppDispatch } from '@/store';

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: IUser | null;
  formType: 'add' | 'edit' | 'view';
  onSubmit: (data: IUser) => void;
  rows: IUser[]; // Add rows prop to access current rows
  setRows: React.Dispatch<React.SetStateAction<IUser[]>>; // Add setRows prop to update rows
}

export default function CustomerForm({
  open,
  onClose,
  initialData,
  formType,
  rows,
  setRows,
}: CustomerFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: initialData || {
      id: Date.now(),
      fullname: '',
      email: '',
      password: '',
      phone: '',
      role: 'user',
      createdAt: new Date(),
    },
  });

  // Populate form fields if initialData is provided
  React.useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof IUser, initialData[key as keyof IUser]);
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data: IUser) => {
    if (formType === 'add') {
      // const newId = Math.max(0, ...rows.map((row) => row.id ?? 0)) + 1;
      // setRows([...rows, { ...data, id: newId }]);
      console.log(data)
      await dispatch(addUser(data)).unwrap(); // Sử dụng unwrap để lấy kết quả trực tiếp
      toast.success('Thêm thành công!');
    } else {
      setRows(rows.map((row) => (row.id === data.id ? data : row)));
      toast.success('Chỉnh sửa thành công!');
    }
    clearErrors();
    onClose();
  };

  const getFormTitle = () => {
    switch (formType) {
      case 'add':
        return 'Thêm Người Dùng';
      case 'edit':
        return 'Chỉnh Sửa Người Dùng';
      default:
        return 'Thông Tin Người Dùng';
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        clearErrors();
        onClose();
      }}
    >
      <Paper
        elevation={24}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            p: 3,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '50px',
              position: 'absolute',
              top: 0,
              left: 0,
              bgcolor: 'warning.light',
              zIndex: 0,
            }}
          />
          <Avatar
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              border: '4px solid white',
              zIndex: 1,
            }}
            src="/path-to-avatar.jpg"
          />
          <Typography
            variant="h6"
            component="h2"
            align="center"
            sx={{ zIndex: 1 }}
          >
            {getFormTitle()}
          </Typography>
        </Box>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(handleFormSubmit)}
          sx={{
            p: 3,
            maxHeight: '70vh',
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '0.4em',
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.1)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.2)',
              borderRadius: '4px',
            },
          }}
        >
          <Stack spacing={2.5}>
            <TextField
              label="Họ và tên"
              fullWidth
              size="small"
              disabled={formType === 'view'}
              {...register('fullname', { required: 'Họ và tên là bắt buộc' })}
              error={!!errors.fullname}
              helperText={errors.fullname?.message}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />

            <TextField
              label="Email"
              fullWidth
              size="small"
              disabled={formType === 'view'}
              type="email"
              {...register('email', {
                required: 'Email là bắt buộc',
                pattern: { value: /^\S+@\S+$/, message: 'Email không hợp lệ' },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />

            {formType !== 'view' && (
              <TextField
                label="Mật khẩu"
                fullWidth
                size="small"
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Mật khẩu là bắt buộc',
                  minLength: {
                    value: 6,
                    message: 'Mật khẩu tối thiểu 6 ký tự',
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  sx: { borderRadius: 1 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            )}

            <Divider textAlign="left">Thông tin liên hệ</Divider>

            <TextField
              label="Số điện thoại"
              fullWidth
              size="small"
              disabled={formType === 'view'}
              {...register('phone', {
                required: 'Số điện thoại là bắt buộc',
                pattern: {
                  value: /^\+?\d+$/,
                  message: 'Số điện thoại không hợp lệ',
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              InputProps={{
                sx: { borderRadius: 1 },
                startAdornment:
                  formType === 'view' ? (
                    <InputAdornment position="start">+</InputAdornment>
                  ) : null,
              }}
            />

           

            <TextField
              label="Vai trò"
              fullWidth
              size="small"
              select
              disabled={formType === 'view'}
              {...register('role')}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            >
              <MenuItem value="customer">Khách Hàng</MenuItem>
              <MenuItem value="admin">Quản Trị Viên</MenuItem>
            </TextField>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
            }}
          >
            <Button
              variant="outlined"
              onClick={onClose}
              sx={{ width: '48%' }}
            >
              Hủy
            </Button>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ width: '48%' }}
            >
              {formType === 'add' ? 'Thêm' : formType === 'edit' ? 'Cập Nhật' : 'Xem'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
