import React, { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
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

const schema = z.object({
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
  min_price: z
    .number()
    .min(0, 'Giá tối thiểu không được âm')
    .optional(),
  img: z.string().optional(),
}).refine((data) => data.end > data.start, {
  message: "Ngày kết thúc phải sau ngày bắt đầu",
  path: ["end"],
});

type VoucherFormData = z.infer<typeof schema>;

interface VoucherModalProps {
  open: boolean;
  onClose: () => void;
  voucher?: VoucherFormData | null;
  mode: 'edit' | 'view' | 'create';
}

const style = {
  modalBox: {
    position: 'absolute' as 'absolute',
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
  mode
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<VoucherFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      discount_percent: 0,
      limit: 1,
      min_price: 0,
      start: new Date(),
      end: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    }
  });

  useEffect(() => {
    if (voucher) {
      reset(voucher);
    }
  }, [voucher, reset]);

  const onSubmit = (data: VoucherFormData) => {
    if (mode === 'edit') {
      toast.success('Cập nhật voucher thành công!');
      console.log('Updated voucher:', data);
    } else {
      toast.success('Tạo voucher thành công!');
      console.log('Created voucher:', data);
    }
    onClose();
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
          {mode === 'edit' ? 'Chỉnh sửa voucher' : mode === 'view' ? 'Chi tiết voucher' : 'Tạo voucher mới'}
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
            <FormControl sx={style.formControl} error={!!errors.discount_percent}>
              <Controller
                name="discount_percent"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phần trăm giảm giá"
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
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
                          helperText: errors.start?.message
                        }
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
                          helperText: errors.end?.message
                        }
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
                      startAdornment: <InputAdornment position="start">VND</InputAdornment>,
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
      render={({ field }) => (
        <>
          {/* <InputLabel>Hình ảnh</InputLabel> */}
          <OutlinedInput
            {...field}
            type="file"
            inputProps={{ accept: 'image/*' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                field.onChange(file); // Gán file thay vì string
              }
            }}
            error={!!errors.img}
            disabled={isViewMode}
            fullWidth
          />
          {errors.img && (
            <Typography color="error" variant="caption">
              {errors.img?.message}
            </Typography>
          )}
        </>
      )}
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