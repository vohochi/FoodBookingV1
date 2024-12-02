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
  IconButton,
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';

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
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

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
      img: '',
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
      if (initialData.img && typeof initialData.img === 'string') {
        setPreviewUrl(initialData.img);
      }
    }
  }, [initialData, setValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setValue('img', file);

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue('img', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormSubmit = async (data: IPaymentMethod) => {
    try {
      if (formType === 'add') {
        const result = await dispatch(addPaymentMethod(data));
        console.log('Add result:', result);
        toast.success('Thêm phương thức thanh toán thành công!');
      } else if (formType === 'edit' && initialData?._id) {
        const result = await dispatch(
          updatePaymentMethodAction({
            _id: initialData._id!,
            paymentMethod: data,
          })
        );
        console.log('Edit result:', result);
        toast.success('Chỉnh sửa phương thức thanh toán thành công!');
      }
      dispatch(fetchPaymentMethods({ page: 1, limit: 9 }));

      clearErrors();
      onClose();
    } catch (error) {
      console.error('Detailed error:', error);
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
            {/* Image Upload Section */}
            <Box sx={{ textAlign: 'center' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                ref={fileInputRef}
              />

              {previewUrl ? (
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Image
                    src={`${previewUrl}`}
                    alt="Preview"
                    width={200}
                    height={200}
                    style={{
                      objectFit: 'contain',
                    }}
                  />
                  <IconButton
                    onClick={handleRemoveImage}
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: '#f5f5f5' },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ) : (
                <Button
                  variant="outlined"
                  component="span"
                  onClick={() => fileInputRef.current?.click()}
                  startIcon={<CloudUploadIcon />}
                  disabled={formType === 'view'}
                >
                  Tải ảnh lên
                </Button>
              )}
            </Box>

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
              marginTop: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formType === 'view'}
            >
              {formType === 'add'
                ? 'Thêm'
                : formType === 'edit'
                ? 'Cập nhật'
                : 'Xem'}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onClose}
              sx={{ ml: 1 }}
            >
              Đóng
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
}