import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  TextField,
  Typography,
  Divider,
  Box,
  Modal,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PhotoCamera, Close } from '@mui/icons-material';
import { Menu } from '@/types/Menu';

interface MenuFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Menu | null;
  formType: 'add' | 'edit';
  onSubmit: (data: Menu) => Promise<void>;
  categories?: Array<{ id: number; name: string }>;
}

const validationSchema = Yup.object({
  menu_id: Yup.number()
    .required('Mã món ăn là bắt buộc')
    .positive('Mã món ăn phải là số dương'),
  name: Yup.string()
    .required('Tên món ăn là bắt buộc')
    .min(2, 'Tên món ăn phải có ít nhất 2 ký tự')
    .max(100, 'Tên món ăn không được vượt quá 100 ký tự'),
  description: Yup.string()
    .required('Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  price: Yup.number()
    .required('Giá là bắt buộc')
    .positive('Giá phải là số dương'),
  category_id: Yup.number().required('Danh mục là bắt buộc'),
  image: Yup.string().required('URL hình ảnh là bắt buộc'),
});

export default function MenuForm({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
  categories = [],
}: MenuFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  // console.log(initialData);

  const formik = useFormik({
    initialValues: initialData || {
      menu_id: 0,
      name: '',
      description: '',
      price: 0,
      category_id: 0,
      image: '',
      _id: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError(null);
        const newMenu: Menu = {
          ...values,
          created_at: initialData?.created_at || new Date(),
          updated_at: new Date(),
        };
        await onSubmit(newMenu);
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

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="menu-form-title"
      aria-describedby="menu-form-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 500 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
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
          <Typography variant="h6" component="h2" id="menu-form-title">
            {formType === 'add' ? 'Thêm Món Ăn Mới' : 'Chỉnh Sửa Món Ăn'}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              id="menu_id"
              name="menu_id"
              label="Mã Món Ăn"
              // value={formik.values.menu_id}
              defaultValue={initialData?.menu_id || 0} // Sử dụng initialData
              onChange={formik.handleChange}
              error={formik.touched.menu_id && Boolean(formik.errors.menu_id)}
              helperText={formik.touched.menu_id && formik.errors.menu_id}
              disabled={formType === 'edit'}
            />

            <TextField
              fullWidth
              id="name"
              name="name"
              label="Tên Món Ăn"
              // value={formik.values.name}
              defaultValue={initialData?.name || ''} // Sử dụng initialData
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              fullWidth
              id="description"
              name="description"
              label="Mô Tả"
              multiline
              rows={4}
              // value={formik.values.description}
              defaultValue={initialData?.description || ''} // Sử dụng initialData
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <TextField
              fullWidth
              id="price"
              name="price"
              label="Giá"
              type="number"
              // value={formik.values.price}
              defaultValue={initialData?.price || 0} // Sử dụng initialData
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">₫</InputAdornment>
                ),
              }}
            />

            <FormControl
              fullWidth
              error={
                formik.touched.category_id && Boolean(formik.errors.category_id)
              }
            >
              <InputLabel id="category-id-label">Danh mục</InputLabel>
              <Select
                labelId="category-id-label"
                id="category_id"
                name="category_id"
                // value={formik.values.category_id}
                defaultValue={initialData?.category_id || 0} // Sử dụng initialData
                onChange={formik.handleChange}
                label="Danh mục"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.category_id && formik.errors.category_id && (
                <FormHelperText>{formik.errors.category_id}</FormHelperText>
              )}
            </FormControl>

            <TextField
              fullWidth
              id="image"
              name="image"
              label="URL Hình Ảnh"
              // value={formik.values.image}
              defaultValue={initialData?.image || ''} // Sử dụng initialData
              onChange={formik.handleChange}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <PhotoCamera />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {formik.values.image && (
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundImage: `url(${formik.values.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
            )}

            <Box display="flex" justifyContent="flex-end" gap={1}>
              <Button onClick={onClose} color="inherit">
                Hủy
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={!formik.isValid || !formik.dirty}
              >
                {formType === 'add' ? 'Thêm món ăn' : 'Lưu thay đổi'}
              </LoadingButton>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
