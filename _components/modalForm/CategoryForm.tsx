// app/modalForm/CategoryForm.tsx
import * as React from 'react';
import {
  Button,
  TextField,
  Typography,
  Divider,
  Box,
  Modal,
} from '@mui/material';
import { Category } from '@/types/Category';

interface CategoryFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Category | null;
  formType: 'add' | 'edit';
  onSubmit: (data: Category) => void;
}

export default function CategoryForm({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
}: CategoryFormProps) {
  const [name, setName] = React.useState(initialData?.name || '');
  const [description, setDescription] = React.useState(
    initialData?.description || ''
  );
  const [img, setImg] = React.useState(initialData?.img || '');

  const handleSubmit = () => {
    const newCategory: Category = {
      category_id: initialData?.category_id || Date.now().toString(),
      name,
      description,
      createdAt: initialData?.createdAt || new Date(),
      updateAt: new Date(),
      img,
    };
    onSubmit(newCategory);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflow: 'auto',
          maxHeight: '90vh',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          {formType === 'add' ? 'Thêm Thể Loại' : 'Chỉnh Sửa Thể Loại'}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Tên Thể Loại"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Mô Tả"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="URL Ảnh"
            variant="outlined"
            fullWidth
            value={img}
            onChange={(e) => setImg(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>
              Hủy
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {formType === 'add' ? 'Thêm' : 'Lưu'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
