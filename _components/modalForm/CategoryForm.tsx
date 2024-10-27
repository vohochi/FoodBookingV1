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
  Stack,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { PhotoCamera, Close } from '@mui/icons-material';
import { Category } from '@/types/Category';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Category | null;
  formType: 'add' | 'edit';
  onSubmit: (data: Category) => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Tên thể loại là bắt buộc')
    .min(2, 'Tên thể loại phải có ít nhất 2 ký tự')
    .max(50, 'Tên thể loại không được vượt quá 50 ký tự'),
  description: Yup.string()
    .required('Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(500, 'Mô tả không được vượt quá 500 ký tự'),
  img: Yup.string().required('URL ảnh là bắt buộc').url('URL ảnh không hợp lệ'),
});

export default function CategoryForm({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
}: CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      img: initialData?.img || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        setError(null);

        const newCategory: Category = {
          category_id: initialData?.category_id || Date.now().toString(),
          ...values,
          createdAt: initialData?.createdAt || new Date(),
          updateAt: new Date(),
        };

        await onSubmit(newCategory);
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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="category-form-title"
      aria-describedby="category-form-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 600 },
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
          <Typography variant="h6" component="h2" id="category-form-title">
            {formType === 'add' ? 'Thêm Thể Loại Mới' : 'Chỉnh Sửa Thể Loại'}
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

        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          onKeyPress={handleKeyPress}
        >
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Tên Thể Loại"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <TextField
              fullWidth
              id="img"
              name="img"
              label="URL Ảnh"
              value={formik.values.img}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.img && Boolean(formik.errors.img)}
              helperText={formik.touched.img && formik.errors.img}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <PhotoCamera />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {formik.values.img && (
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundImage: `url(${formik.values.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  opacity: formik.errors.img ? 0.3 : 1,
                }}
              />
            )}

            <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
              <Button onClick={onClose} color="inherit">
                Hủy
              </Button>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={!formik.isValid || !formik.dirty}
              >
                {formType === 'add' ? 'Thêm thể loại' : 'Lưu thay đổi'}
              </LoadingButton>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
