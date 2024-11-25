import React, { useEffect, useRef } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  OutlinedInput,
  InputAdornment,
  Grid,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import {
  createVoucherAsync,
  fetchVouchers,
  updateVoucherAsync,
} from '@/store/slice/voucherSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { Voucher } from '@/types/Voucher';

const schema = z
  .object({
    name: z.string().min(1, 'Tên voucher là bắt buộc'),
    code: z.string().min(1, 'Mã voucher là bắt buộc'),
    discount_percent: z
      .number()
      .min(0, 'Phần trăm giảm giá không được âm')
      .max(100, 'Phần trăm giảm giá không được vượt quá 100%'),
    start: z.date().min(new Date(), 'Ngày bắt đầu phải sau thời điểm hiện tại'),
    end: z.date(),
    limit: z
      .number()
      .min(1, 'Số lượng phải lớn hơn 0')
      .int('Số lượng phải là số nguyên'),
    min_price: z.number().min(0, 'Giá tối thiểu không được âm').optional(),
    img: z
      .instanceof(File)
      .optional()
      .refine(
        (file) => {
          if (!file) return true; // Allow empty file
          return file.type.startsWith('image/'); // Validate image type
        },
        { message: 'Vui lòng chọn tệp ảnh hợp lệ' }
      ),
  })

  .refine((data) => data.end > data.start, {
    message: 'Ngày kết thúc phải sau ngày bắt đầu',
    path: ['end'],
  });

type VoucherFormData = z.infer<typeof schema>;

interface VoucherModalProps {
  open: boolean;
  onClose: () => void;
  voucher: Voucher | null; // Ensure the type matches the prop expected in CouponModal
  mode: 'edit' | 'view' | 'create' | null;
}

const style = {
  modalBox: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '8px',
    p: 4,
    width: { xs: '90%', sm: '80%', md: '60%', lg: '50%' },
    maxHeight: '90vh',
    overflow: 'auto',
  },
  buttonContainer: {
    mt: 4,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
  },
  formControl: {
    width: '100%',
  },
};

const VoucherModal: React.FC<VoucherModalProps> = ({
  open,
  onClose,
  voucher,
  mode,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<VoucherFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      discount_percent: 0,
      limit: 1,
      min_price: 0,
      start: new Date(),
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    },
  });
  useEffect(() => {
    if (voucher) {
      console.log('Voucher data:', voucher); // Log to check voucher value

      const resetVoucher = {
        _id: voucher._id,
        name: voucher.name,
        code: voucher.code,
        discount_percent: voucher.discount_percent,
        start: voucher.start,
        end: voucher.end,
        limit: voucher.limit,
        min_price: voucher.min_price, // Make sure it's passed only if it exists
        img: voucher.img instanceof File ? voucher.img : undefined, // Ensure img is a File or undefined
      };

      reset(resetVoucher); // Reset with the modified voucher
    }
  }, [voucher, reset]);

  const onSubmit = async (data: VoucherFormData) => {
    try {
      // Add a type guard to check if voucher exists and has _id when in edit mode
      if (mode === 'edit' && voucher && voucher._id) {
        // Update existing voucher
        await dispatch(
          updateVoucherAsync({
            id: voucher._id,
            voucher: data as Voucher,
          })
        ).unwrap();
        toast.success('Cập nhật voucher thành công!');
      } else {
        // Create new voucher
        await dispatch(createVoucherAsync(data as Voucher));
        dispatch(fetchVouchers({ page: 1, limit: 9 }));

        toast.success('Tạo voucher thành công!');
      }
      onClose(); // Close modal after successful submission
    } catch (error) {
      // Handle any errors from the async thunk
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
      console.error('Voucher submission error:', error);
    }
  };
  const isViewMode = mode === 'view';

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="voucher-modal-title"
      aria-describedby="voucher-modal-description"
    >
      <Box sx={style.modalBox}>
        <Typography
          id="voucher-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 3 }}
        >
          {mode === 'edit'
            ? 'Chỉnh sửa voucher'
            : mode === 'view'
            ? 'Chi tiết voucher'
            : 'Tạo voucher mới'}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl sx={style.formControl} error={!!errors.name}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Tên voucher"
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    disabled={isViewMode}
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={style.formControl} error={!!errors.code}>
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mã voucher"
                    error={!!errors.code}
                    helperText={errors.code?.message}
                    disabled={isViewMode}
                    fullWidth
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              sx={style.formControl}
              error={!!errors.discount_percent}
            >
              <Controller
                name="discount_percent"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phần trăm giảm giá"
                    type="number"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    }}
                    error={!!errors.discount_percent}
                    helperText={errors.discount_percent?.message}
                    disabled={isViewMode}
                    fullWidth
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={style.formControl} error={!!errors.limit}>
              <Controller
                name="limit"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Số lượng voucher"
                    type="number"
                    error={!!errors.limit}
                    helperText={errors.limit?.message}
                    disabled={isViewMode}
                    fullWidth
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={style.formControl}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="start"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      label="Ngày bắt đầu"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isViewMode}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.start,
                          helperText: errors.start?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl sx={style.formControl}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Controller
                  name="end"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      label="Ngày kết thúc"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isViewMode}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          error: !!errors.end,
                          helperText: errors.end?.message,
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={style.formControl} error={!!errors.min_price}>
              <Controller
                name="min_price"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Giá tối thiểu"
                    type="number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">VND</InputAdornment>
                      ),
                    }}
                    error={!!errors.min_price}
                    helperText={errors.min_price?.message}
                    disabled={isViewMode}
                    fullWidth
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl sx={style.formControl} error={!!errors.img}>
              <Controller
                name="img"
                control={control}
                render={({ field: { onChange, value, ...field } }) => {
                  const handleFileChange = (
                    e: React.ChangeEvent<HTMLInputElement>
                  ) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  };

                  const handleClearFile = () => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''; // Clear the file input
                      onChange(null); // Clear the form value
                    }
                  };

                  return (
                    <>
                      <input
                        {...field}
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        id="voucher-image-upload"
                      />
                      <OutlinedInput
                        fullWidth
                        readOnly
                        value={value ? value?.name : ''}
                        endAdornment={
                          <InputAdornment position="end">
                            <Button
                              variant="contained"
                              component="label"
                              htmlFor="voucher-image-upload"
                            >
                              Chọn ảnh
                            </Button>
                            {value && (
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={handleClearFile}
                                sx={{ ml: 1 }}
                              >
                                Xóa
                              </Button>
                            )}
                          </InputAdornment>
                        }
                      />
                      {errors.img && (
                        <Typography color="error" variant="caption">
                          {errors.img?.message}
                        </Typography>
                      )}
                    </>
                  );
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={style.buttonContainer}>
          {!isViewMode && (
            <Button
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              sx={{ minWidth: '120px' }}
            >
              {mode === 'edit' ? 'Cập nhật' : 'Tạo mới'}
            </Button>
          )}
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{ minWidth: '120px' }}
          >
            {isViewMode ? 'Đóng' : 'Hủy'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default VoucherModal;
