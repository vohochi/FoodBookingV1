import * as React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Typography,
  Divider,
  Box,
  Modal,
  Stack,
  IconButton,
  InputAdornment,
  Alert,
  Paper,
  Grid,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  PhotoCamera,
  Close,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { Category } from '@/types/Category';
import Image from 'next/image';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Category | null;
  formType: 'add' | 'edit' | 'view';
  onSubmit: (data: Category) => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Tên thể loại là bắt buộc').min(2).max(50),
  description: Yup.string().required('Mô tả là bắt buộc').min(10).max(500),
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

  React.useEffect(() => {
    if (initialData) {
      formik.setValues({
        name: initialData.name,
        description: initialData.description,
        img: initialData.img,
      });
    }
  }, [initialData]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formik.handleSubmit();
    }
  };

  const renderViewMode = () => (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          backgroundColor: 'grey.50',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <CategoryIcon color="primary" />
              <Typography variant="h6" color="primary">
                {formik.values.name}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Mô tả
              </Typography>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                {formik.values.description}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Ảnh minh họa
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: 'background.paper',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Image
                    src={formik.values.img}
                    alt={formik.values.name}
                    width={100}
                    height={100}
                    style={{
                      objectFit: 'cover',
                      borderRadius: 8,
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        wordBreak: 'break-all',
                        fontFamily: 'monospace',
                      }}
                    >
                      {formik.values.img}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>

          {initialData && (
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Stack
                direction="row"
                spacing={4}
                sx={{
                  pt: 1,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="body2">
                  Ngày tạo:{' '}
                  {new Date(initialData.createdAt).toLocaleDateString('vi-VN')}
                </Typography>
                <Typography variant="body2">
                  Cập nhật:{' '}
                  {new Date(initialData.updateAt).toLocaleDateString('vi-VN')}
                </Typography>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="category-form-title">
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
            {formType === 'add'
              ? 'Thêm Thể Loại Mới'
              : formType === 'edit'
              ? 'Chỉnh Sửa Thể Loại'
              : 'Chi Tiết Thể Loại'}
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

        {formType === 'view' ? (
          renderViewMode()
        ) : (
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
                  formik.touched.description &&
                  Boolean(formik.errors.description)
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
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhotoCamera />
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
                disabled={isSubmitting}
              >
                {formType === 'add' ? 'Thêm' : 'Lưu'}
              </LoadingButton>
            </Stack>
          </Box>
        )}
      </Box>
    </Modal>
  );
}
