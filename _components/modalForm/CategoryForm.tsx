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
import Grid from '@mui/material/Grid';
import toast from 'react-hot-toast';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Category | null;
  formType: 'add' | 'edit' | 'view';
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
    validateOnBlur: false,
    validateOnChange: false, // Disable validation on change
    validateOnMount: false, //

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
              data: {}, // Thêm trường data với giá trị mặc định là đối tượng rỗng
              totalMenuItems: 0, // Thêm trường totalMenuItems với giá trị mặc định là 0
            })
          );
          toast.success('Thêm danh mục thành công!');
        } else if (formType === 'edit') {
          if (initialData && initialData._id !== undefined) {
            dispatch(
              updateCategoryThunk({
                id: initialData._id, // Kiểm tra undefined
                category: {
                  ...formik.values, // Các giá trị từ formik
                  _id: initialData._id, // Thêm _id từ dữ liệu ban đầu
                  data: initialData.data || {}, // Thêm data từ dữ liệu ban đầu hoặc đối tượng rỗng
                  totalMenuItems: initialData.totalMenuItems || 0, // Thêm totalMenuItems từ dữ liệu ban đầu hoặc 0
                },
              })
            );
            toast.success('Cập nhật danh mục thành công!');
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
    if (formType === 'add') {
      formik.resetForm({
        values: {
          id: '', // Đặt lại id thành rỗng
          name: '',
          description: '',
          img: '', // Đặt lại img thành rỗng
        },
      });
    } else if (formType === 'edit' && initialData) {
      formik.setValues({
        id: initialData._id, // Cập nhật id từ initialData
        name: initialData.name,
        description: initialData.description,
        img: initialData.img || '', // Đảm bảo img không bị null hoặc undefined
      });
    }
  }, [formType, initialData]);
  React.useEffect(() => {
    formik.setValues({
      id: initialData?._id || '',
      name: initialData?.name || '',
      description: initialData?.description || '',
      img: initialData?.img || '',
    });
  }, [initialData, formType]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      formik.handleSubmit();
    }
  };
  const renderViewMode = () => (
    <Box>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          bgcolor: 'background.default',
          borderRadius: 2,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: (theme) => theme.palette.primary.light,
                }}
              >
                <CategoryIcon
                  sx={{
                    color: 'primary.main',
                    fontSize: 28,
                  }}
                />
              </Paper>
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: 'medium' }}
              >
                {formik.values.name}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
                sx={{ fontWeight: 'medium', mb: 1 }}
              >
                Mô tả
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: 'pre-line',
                  bgcolor: (theme) => theme.palette.grey[50],
                  p: 2,
                  borderRadius: 1,
                }}
              >
                {formik.values.description}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
                sx={{ fontWeight: 'medium', mb: 1 }}
              >
                Ảnh minh họa
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: (theme) => theme.palette.grey[50],
                }}
              >
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 120,
                      height: 120,
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: 1,
                    }}
                  >
                    {formik.values.img && (
                      <Image
                        src={
                          typeof formik.values.img === 'string'
                            ? formik.values.img
                            : URL.createObjectURL(formik.values.img)
                        }
                        alt={formik.values.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        wordBreak: 'break-all',
                        fontFamily: 'monospace',
                        color: 'text.secondary',
                        bgcolor: 'background.paper',
                        p: 1.5,
                        borderRadius: 1,
                        border: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      {formik.values.img
                        ? typeof formik.values.img === 'string'
                          ? formik.values.img
                          : formik.values.img.name
                        : ''}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Box>
          </Grid>

          {initialData && (
            <Grid item xs={12}>
              <Divider sx={{ my: 1 }} />
              <Stack
                direction="row"
                spacing={4}
                sx={{
                  pt: 2,
                  color: 'text.secondary',
                }}
              >
                <Typography variant="body2" sx={{ display: 'flex', gap: 1 }}>
                  <span style={{ color: '#666' }}>Ngày tạo:</span>
                  {initialData?.createdAt
                    ? new Date(initialData.createdAt).toLocaleDateString(
                        'vi-VN'
                      )
                    : 'N/A'}
                </Typography>
                {/* <Typography variant="body2" sx={{ display: 'flex', gap: 1 }}>
                    <span style={{ color: '#666' }}>Cập nhật:</span>
                    {initialData?.updateAt
                      ? new Date(initialData.updateAt).toLocaleDateString('vi-VN')
                      : 'N/A'}{' '}
                  </Typography> */}
              </Stack>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Box>
  );

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
