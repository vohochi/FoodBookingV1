import * as React from 'react';
import {
  Button,
  TextField,
  Typography,
  Box,
  Modal,
  Paper,
  MenuItem,
  Stack,
} from '@mui/material';
import { IPaymentMethod } from '@/types/PaymentMethod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {
  addPaymentMethod,
  fetchPaymentMethods,
  updatePaymentMethodAction,
} from '@/store/slice/paymentMethodSlice';
import { AppDispatch } from '@/store';

interface PaymentMethodFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: IPaymentMethod | null;
  formType: 'add' | 'edit' | 'view';
  onSubmit: (data: IPaymentMethod) => void;
}

export default function PaymentMethodForm({
  open,
  onClose,
  initialData,
  formType,
}: PaymentMethodFormProps) {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: initialData || {
      name: '',
      type: '',
      status: 'active',
      description: '',
    },
  });

  // Populate form fields if initialData is provided
  React.useEffect(() => {
    if (initialData) {
      Object.keys(initialData).forEach((key) => {
        setValue(
          key as keyof IPaymentMethod,
          initialData[key as keyof IPaymentMethod]
        );
      });
    }
  }, [initialData, setValue]);

  const handleFormSubmit = async (data: IPaymentMethod) => {
    try {
      if (formType === 'add') {
        const result = await dispatch(addPaymentMethod(data)).unwrap();
        // Log the result to see what's happening
        console.log('Add result:', result);
        toast.success('Thêm phương thức thanh toán thành công!');
      } else if (formType === 'edit' && initialData?._id) {
        const { _id, createdAt, updatedAt, ...updates } = data;
        const result = await dispatch(
          updatePaymentMethodAction({
            _id: initialData._id!,
            updates,
          })
        ).unwrap();
        // Log the result to see what's happening
        console.log('Edit result:', result);
        toast.success('Chỉnh sửa phương thức thanh toán thành công!');
      }

      clearErrors();
      onClose();
    } catch (error) {
      // Only show error toast if it's a genuine error
      console.error('Detailed error:', error);

      // Check if error is a genuine error before showing toast
      if (error instanceof Error) {
        toast.error('Có lỗi xảy ra!');
      }
    }
  };

  const getFormTitle = () => {
    switch (formType) {
      case 'add':
        return 'Thêm Phương Thức Thanh Toán';
      case 'edit':
        return 'Chỉnh Sửa Phương Thức Thanh Toán';
      default:
        return 'Thông Tin Phương Thức Thanh Toán';
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
              label="Tên phương thức"
              fullWidth
              size="small"
              disabled={formType === 'view'}
              {...register('name', { required: 'Tên phương thức là bắt buộc' })}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />

            <TextField
              label="Loại phương thức"
              fullWidth
              size="small"
              disabled={formType === 'view'}
              {...register('type', {
                required: 'Loại phương thức là bắt buộc',
              })}
              error={!!errors.type}
              helperText={errors.type?.message}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />

            <TextField
              label="Trạng thái"
              fullWidth
              size="small"
              select
              disabled={formType === 'view'}
              {...register('status')}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            >
              <MenuItem value="active">Hoạt Động</MenuItem>
              <MenuItem value="inactive">Không Hoạt Động</MenuItem>
            </TextField>

            <TextField
              label="Mô tả"
              fullWidth
              size="small"
              multiline
              rows={3}
              disabled={formType === 'view'}
              {...register('description')}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />
          </Stack>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
            }}
          >
            <Button variant="outlined" onClick={onClose} sx={{ width: '48%' }}>
              Hủy
            </Button>
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
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}
