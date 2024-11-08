import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Typography,
  Divider,
  Box,
  Modal,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  InputLabel,
  Paper,
  Backdrop,
  Fade,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PhotoCamera, Close, Restaurant } from '@mui/icons-material';
import { addDish, editDish } from '@/store/slice/menusSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '@/store/selector/categoriesSelector';
import { fetchCategories } from '@/store/slice/categorySlice';
import { AppDispatch } from '@/store';
import { Menu } from '@/types/Menu';
import Image from 'next/image';

interface MenuFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Menu | null;
  formType: 'add' | 'edit';
  onSubmit: (data: FormData) => Promise<void>;
}

interface Category {
  _id: string;
  name: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Tên món ăn là bắt buộc').min(2).max(100),
  description: Yup.string().required('Mô tả là bắt buộc').min(10),
  price: Yup.number().required('Giá là bắt buộc').positive(),
  quantity: Yup.number().required('Số lượng là bắt buộc').min(1),
  category: Yup.string().required('Danh mục là bắt buộc'),
  img: Yup.mixed()
    .required('Ảnh là bắt buộc')
    .test(
      'fileSize',
      'Kích thước tệp ảnh không được vượt quá 5MB.',
      (value) => {
        if (value instanceof File) {
          return value.size <= 5 * 1024 * 1024;
        }
        return true;
      }
    )
    .test(
      'fileType',
      'Chỉ chấp nhận tệp hình ảnh (jpg, jpeg, png)',
      (value) => {
        if (value instanceof File) {
          return ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
        }
        return true;
      }
    ),
});

export default function MenuForm({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
}: MenuFormProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const categories = useSelector(selectCategories) as Category[];

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  React.useEffect(() => {
    // Cleanup preview URL when component unmounts
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      price: initialData?.price || 0,
      quantity: initialData?.quantity || 1,
      category: initialData?.category || '', // Sửa từ category_id thành category
      img: null as File | null,
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData();
        Object.keys(values).forEach((key) => {
          if (key === 'img' && values.img instanceof File) {
            formData.append('img', values.img);
          } else {
            formData.append(key, String(values[key as keyof typeof values]));
          }
        });

        // Log để kiểm tra id
        console.log('initialData ID:', initialData?._id || initialData?.id);

        // Add ID nếu đang chỉnh sửa
        if (initialData?._id) {
          formData.append('_id', initialData._id);
        } else if (initialData?.id) {
          formData.append('id', initialData.id);
        }

        await onSubmit(formData);
        if (formType === 'edit' && initialData?._id) {
          await dispatch(editDish({ id: initialData._id, dish: values }));
        } else {
          await dispatch(addDish(values));
        }
        onClose();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Có lỗi xảy ra khi lưu dữ liệu'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clean up previous preview URL
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      // Create new preview URL
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Update formik value
      formik.setFieldValue('img', file);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 600 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Restaurant color="primary" />
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 'medium' }}
              >
                {formType === 'add' ? 'Thêm Món Ăn Mới' : 'Chỉnh Sửa Món Ăn'}
              </Typography>
            </Stack>
            <IconButton
              onClick={onClose}
              size="small"
              sx={{
                color: 'text.secondary',
                '&:hover': { bgcolor: 'grey.100' },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {error && (
            <Alert
              severity="error"
              sx={{ mb: 3 }}
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Tên Món Ăn"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                autoFocus
              />

              <TextField
                fullWidth
                id="description"
                name="description"
                label="Mô Tả"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />

              <Stack direction="row" spacing={2}>
                <TextField
                  fullWidth
                  id="price"
                  name="price"
                  label="Giá"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />

                <TextField
                  fullWidth
                  id="quantity"
                  name="quantity"
                  label="Số Lượng"
                  type="number"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.quantity && Boolean(formik.errors.quantity)
                  }
                  helperText={formik.touched.quantity && formik.errors.quantity}
                />
              </Stack>

              <FormControl
                fullWidth
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                <InputLabel>Danh Mục</InputLabel>
                <Select
                  value={formik.values.category}
                  onChange={formik.handleChange}
                  name="category"
                  label="Danh Mục"
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {formik.touched.category && formik.errors.category}
                </FormHelperText>
              </FormControl>

              <TextField
                fullWidth
                id="img"
                name="img"
                label="Ảnh"
                type="file"
                onChange={handleImageUpload}
                error={formik.touched.img && Boolean(formik.errors.img)}
                helperText={formik.touched.img && formik.errors.img}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton color="primary" component="label">
                        <PhotoCamera color="action" />
                        <input type="file" hidden accept="image/*" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: { accept: 'image/*' },
                }}
              />

              {formik.values.img && (
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderRadius: 1,
                    bgcolor: 'grey.50',
                  }}
                >
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    gutterBottom
                    display="block"
                  >
                    Xem trước ảnh
                  </Typography>
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: 200,
                      borderRadius: 1,
                      overflow: 'hidden',
                      mt: 1,
                    }}
                  >
                    <Image
                      src={
                        typeof formik.values.img === 'string'
                          ? formik.values.img
                          : URL.createObjectURL(formik.values.img)
                      }
                      alt="Preview"
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                </Paper>
              )}

              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={isSubmitting}
                sx={{
                  py: 1.2,
                  mt: 2,
                }}
              >
                {formType === 'add' ? 'Thêm Món Ăn' : 'Lưu Thay Đổi'}
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
