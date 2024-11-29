import * as React from 'react';
import { ChangeEvent } from 'react';

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
  Fade,
  Backdrop,
} from '@mui/material';
import {
  PhotoCamera,
  Close,
  Category as CategoryIcon,
  Save as SaveIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Category } from '@/types/Category';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import {
  createCategoryThunk,
  updateCategoryThunk,
} from '@/store/slice/categorySlice';
import { AppDispatch } from '@/store';

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
    .test('fileType', 'Chỉ chấp nhận tệp hình ảnh.', (value) => {
      if (value instanceof File) {
        return value.type.startsWith('image/');
      }
      return true;
    }),
});

export default function CategoryForm({
  open,
  onClose,
  initialData,
  formType,
}: // onSubmit,
CategoryFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      id: initialData?._id || '', // Thêm _id vào initialValues
      name: initialData?.name || '',
      description: initialData?.description || '',
      img: initialData?.img || '',
    },
    validationSchema,
    onSubmit: async () => {
      try {
        setIsSubmitting(true);
        setError(null);

        if (formType === 'add') {
          console.log(formik.values);
          dispatch(
            createCategoryThunk({
              ...formik.values, // Giá trị từ formik
              _id: '', // Mặc định `_id` là chuỗi rỗng, vì nó sẽ được server thêm
            })
          );
        } else if (formType === 'edit') {
          if (initialData && initialData._id !== undefined) {
            dispatch(
              updateCategoryThunk({
                id: initialData._id, // Kiểm tra undefined
                category: {
                  ...formik.values, // Các giá trị từ formik
                  _id: initialData._id, // Thêm _id từ dữ liệu ban đầu
                },
              })
            );
          } else {
            // Xử lý trường hợp initialData không tồn tại hoặc id không có giá trị
            console.error('Initial data is missing or id is undefined.');
          }
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
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue('img', file);
    }
  };

  React.useEffect(() => {
    if (initialData) {
      formik.setValues({
        id: initialData._id, // Cập nhật _id trong setValues
        name: initialData.name,
        description: initialData.description,
        img: initialData.img || '', // Đảm bảo giá trị img được truyền vào nếu có
      });
    }
  }, [initialData]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formik.handleSubmit();
    }
  };
  console.log(1);

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
              <CategoryIcon color="primary" />
              <Typography
                variant="h6"
                component="h2"
                sx={{ fontWeight: 'medium' }}
              >
                {formType === 'add'
                  ? 'Thêm Thể Loại Mới'
                  : formType === 'edit'
                  ? 'Chỉnh Sửa Thể Loại'
                  : 'Chi Tiết Thể Loại'}
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
              sx={{
                mb: 3,
                '& .MuiAlert-message': { width: '100%' },
              }}
              onClose={() => setError(null)}
            >
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
              <Stack spacing={3}>
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CategoryIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
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
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.15)',
                      },
                    },
                  }}
                />
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
                    // Truyền thuộc tính accept thông qua inputProps
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
                            ? `${formik.values.img}`
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
                  startIcon={formType === 'add' ? <AddIcon /> : <SaveIcon />}
                  sx={{
                    py: 1.2,
                    mt: 2,
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                >
                  {formType === 'add' ? 'Thêm Thể Loại' : 'Lưu Thay Đổi'}
                </LoadingButton>
              </Stack>
            </Box>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
