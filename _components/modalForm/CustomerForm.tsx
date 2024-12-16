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
import { addUser, editUser } from '@/store/slice/userSlice';
import { AppDispatch } from '@/store';

interface CustomerFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: IUser | null;
  formType: 'add' | 'edit' | 'view';
}

export default function CustomerForm({
  open,
  onClose,
  initialData,
  formType,
}: CustomerFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const defaultValues: Partial<IUser> = {
    fullname: '',
    email: '',
    password: '',
    address: [{ phone: '', receiver: '', address: '' }],
    role: 'user' as 'user' | 'admin',
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IUser>({
    defaultValues,
  });

  const resetForm = () => {
    reset(defaultValues);
  };

  React.useEffect(() => {
    if (formType === 'edit' && initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof IUser, initialData[key as keyof IUser]);
      });
    } else if (formType === 'add') {
      resetForm();
    } else if (formType === 'view' && initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(key as keyof IUser, initialData[key as keyof IUser]);
      });
    }
  }, [formType, initialData, setValue, reset]);

  const handleFormSubmit = async (data: IUser) => {
    try {
      if (formType === 'edit' && initialData?.role === 'admin') {
        toast.error('Không thể chỉnh sửa thông tin quản trị viên');
        return;
      }

      if (formType === 'add') {
        const resultAction = await dispatch(addUser(data));
        console.log(resultAction);
        if (addUser.fulfilled.match(resultAction)) {
          if (resultAction.payload && 'message' in resultAction.payload) {
            // Trường hợp email đã tồn tại
            toast.error('Email đã tồn tại');
          } else {
            // Trường hợp thêm thành công
            toast.success('Thêm thành công!');
            resetForm();
            onClose();
          }
        } else if (addUser.rejected.match(resultAction)) {
          toast.error(
            resultAction.error.message || 'Có lỗi xảy ra khi thêm người dùng'
          );
        }
      } else if (formType === 'edit' && initialData?._id) {
        const updatedData = { ...data };

        if (updatedData.password === '') {
          delete updatedData.password;
        }
        const resultAction = await dispatch(
          editUser({
            _id: initialData._id,
            updates: {
              ...data,
              address: data.address,
            },
          })
        );
        if (editUser.fulfilled.match(resultAction)) {
          if (resultAction.payload && 'message' in resultAction.payload) {
            // Trường hợp email đã tồn tại khi chỉnh sửa
            toast.error('email đã tồn tại');
          } else {
            // Trường hợp chỉnh sửa thành công
            toast.success('Chỉnh sửa thành công!');
            onClose();
          }
        } else if (editUser.rejected.match(resultAction)) {
          toast.error(
            resultAction.error.message ||
              'Có lỗi xảy ra khi chỉnh sửa người dùng'
          );
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra');
      console.error('Error:', error);
    }
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
        resetForm();
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
            src="./Default.png"
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
                  required: formType === 'add' ? 'Mật khẩu là bắt buộc' : false,
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
              {...register('address.0.phone', {
                required: 'Số điện thoại là bắt buộc',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Số điện thoại phải có đúng 10 chữ số',
                },
              })}
              error={!!errors.address?.[0]?.phone}
              helperText={errors.address?.[0]?.phone?.message}
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
              defaultValue={initialData?.role || 'user'}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            >
              <MenuItem value="user">Khách Hàng</MenuItem>
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
              onClick={() => {
                resetForm();
                onClose();
              }}
              sx={{ width: '48%' }}
            >
              Hủy
            </Button>
            {formType !== 'view' && (
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: '48%',
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                {formType === 'add' ? 'Thêm' : 'Lưu'}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
