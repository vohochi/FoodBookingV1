import React, { useEffect } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';

interface CouponCardProps {
  title: string;
  description: string;
  price: string;
  duration: string;
  icon: React.ReactElement;
  quantity: number;
}

interface CouponModalProps {
  open: boolean;
  onClose: () => void;
  coupon: CouponCardProps | null;
  mode: 'edit' | 'view' | null;
}

// Updated schema to enforce quantity as a number
const schema = z.object({
  code: z.string().min(1, 'Mã phiếu giảm giá là bắt buộc'),
  category: z.string().min(1, 'Danh mục là bắt buộc'),
  country: z.string().min(1, 'Sản phẩm là bắt buộc'),
  type: z.string(),
  value: z.string().min(1, 'Giá trị giảm giá là bắt buộc'),
  limits: z.string(),
  quantity: z
    .number()
    .min(1, 'Vui lòng nhập số lượng')
    .int({ message: 'Số lượng phải là số nguyên' }) // Kiểm tra số nguyên
    .transform((val) => (isNaN(val) ? undefined : val)), // Chuyển đổi chuỗi rỗng thành undefined
  description: z.string().optional(), // Trường mô tả là tùy chọn
});

type CouponFormData = z.infer<typeof schema>;

const CouponModal: React.FC<CouponModalProps> = ({
  open,
  onClose,
  coupon,
  mode,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CouponFormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (coupon) {
      reset({
        code: coupon.title || '',
        category: '',
        country: '',
        type: 'free_shipping',
        value: coupon.price || '',
        quantity: coupon.quantity || 0, // Set quantity based on the coupon if available
        description: coupon.description || '', // Set description if available
      });
    }
  }, [coupon, reset]);

  const onSubmit = (data: CouponFormData) => {
    if (mode === 'edit') {
      toast.success('Cập nhật phiếu giảm giá thành công!');
      console.log('Updating coupon:', data);
    } else {
      toast.success('Tạo phiếu giảm giá thành công!');
      console.log('Creating new coupon:', data);
    }
    onClose();
  };

  const isViewMode = mode === 'view';

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="coupon-modal-title">
 <Box
  sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    width: { xs: '90%', sm: '80%', md: '50%', lg: '40%' },
    height: 'fit-content', // Tự động điều chỉnh chiều cao
    maxHeight: '100vh', // Giới hạn chiều cao tối đa
    overflow: 'auto', // Cho phép cuộn nội dung nếu quá dài
  }}
>


        <Typography variant="h5" sx={{ mb: 4 }}>
          {mode === 'edit'
            ? 'Chỉnh sửa phiếu giảm giá'
            : mode === 'view'
            ? 'Xem phiếu giảm giá'
            : 'Tạo phiếu giảm giá'}
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Mã phiếu giảm giá
            </Typography>
            <Controller
              name="code"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Enter coupon code"
                  variant="outlined"
                  disabled={isViewMode}
                  error={!!errors.code}
                  helperText={errors.code?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.category}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Danh mục
              </Typography>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select {...field} displayEmpty disabled={isViewMode}>
                    <MenuItem value="">
                      <em>Choose a category</em>
                    </MenuItem>
                    <MenuItem value="electronics">Electronics</MenuItem>
                    <MenuItem value="clothing">Clothing</MenuItem>
                    <MenuItem value="food">Food</MenuItem>
                  </Select>
                )}
              />
              {errors.category && (
                <Typography variant="caption" color="error">
                  {errors.category.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth error={!!errors.country}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Sản phẩm
              </Typography>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <Select {...field} displayEmpty disabled={isViewMode}>
                    <MenuItem value="">
                      <em>Tất cả sản phẩm</em>
                    </MenuItem>
                    <MenuItem value="us">Nước đá</MenuItem>
                    <MenuItem value="uk">Nước pepsi</MenuItem>
                    <MenuItem value="vn">Nước ngọt</MenuItem>
                  </Select>
                )}
              />
              {errors.country && (
                <Typography variant="caption" color="error">
                  {errors.country.message}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Loại mã giảm giá
            </Typography>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup row {...field}>
                  <FormControlLabel
                    value="free_shipping"
                    control={<Radio color="primary" />}
                    label="Miễn phí vận chuyển"
                    disabled={isViewMode}
                  />
                  <FormControlLabel
                    value="percentage"
                    control={<Radio color="primary" />}
                    label="Tỷ lệ phần trăm"
                    disabled={isViewMode}
                  />
                  <FormControlLabel
                    value="fixed_amount"
                    control={<Radio color="primary" />}
                    label="Số tiền cố định"
                    disabled={isViewMode}
                  />
                </RadioGroup>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Giá trị giảm giá
            </Typography>
            <Controller
              name="value"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập giá trị giảm giá"
                  variant="outlined"
                  disabled={isViewMode}
                  error={!!errors.value}
                  helperText={errors.value?.message}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Số lượng
            </Typography>
            <Controller
              name="quantity"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <TextField
                  inputRef={ref}
                  fullWidth
                  placeholder="Nhập số lượng phiếu giảm giá"
                  variant="outlined"
                  disabled={isViewMode}
                  error={!!errors.quantity}
                  helperText={errors.quantity ? errors.quantity.message : ''}
                  value={value || ''} // Đảm bảo hiển thị chuỗi rỗng khi không có giá trị
                  onChange={(e) => {
                    const newValue = e.target.value;
                    // Chỉ chuyển đổi khi giá trị không rỗng và là số
                    if (newValue === '' || /^[0-9]*$/.test(newValue)) {
                      onChange(newValue ? parseInt(newValue, 10) : undefined); // Chuyển đổi thành số
                    }
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Mô tả
            </Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  placeholder="Nhập mô tả"
                  variant="outlined"
                  disabled={isViewMode}
                  multiline
                  rows={3}
                />
              )}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {!isViewMode && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              {mode === 'edit'
                ? 'Cập nhật phiếu giảm giá'
                : 'Tạo phiếu giảm giá'}
            </Button>
          )}
          <Button variant="outlined" onClick={onClose}>
            {isViewMode ? 'Đóng' : 'Hủy'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CouponModal;
