// AddEditModal.tsx
import * as React from 'react';
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Dish } from '@/app/types/Dish';
import { Category } from '@/app/types/Category'; // Import Category interface

interface AddEditModalProps {
  open: boolean;
  onClose: () => void;
  initialData?: Dish | Category | null; // Dữ liệu ban đầu cho chỉnh sửa
  formType: 'add' | 'edit'; // Loại form (thêm hoặc chỉnh sửa)
  onSubmit: (data: Dish | Category) => void; // Hàm xử lý khi submit form
  formCategory?: boolean; // Tham số xác định đây có phải là form category không
}

export default function AddEditModal({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
  formCategory = false, // Mặc định là false nếu không được truyền vào
}: AddEditModalProps) {
  // State cho món ăn
  const [name, setName] = React.useState(
    formCategory ? '' : initialData?.name || ''
  );
  const [price, setPrice] = React.useState(
    formCategory ? '' : initialData?.price || ''
  );
  const [description, setDescription] = React.useState(
    formCategory ? '' : initialData?.description || ''
  );
  const [imageUrl, setImageUrl] = React.useState(
    formCategory ? '' : initialData?.imageUrl || ''
  );
  const [preparationTime, setPreparationTime] = React.useState(
    formCategory ? '' : initialData?.preparationTime || ''
  );
  const [ingredients, setIngredients] = React.useState(
    formCategory ? '' : initialData?.ingredients.join(', ') || ''
  );
  const [category, setCategory] = React.useState(
    formCategory ? initialData?.name || '' : initialData?.category || ''
  ); // Giả sử thể loại là tên của category

  const handleSubmit = () => {
    let data;
    if (formCategory) {
      data = {
        // Thông tin cho category
        id: initialData?.id || Date.now(),
        name: category,
      };
    } else {
      data = {
        // Thông tin cho món ăn
        id: initialData?.id || Date.now(),
        name,
        price: parseFloat(price),
        description,
        imageUrl,
        preparationTime,
        ingredients: ingredients
          .split(',')
          .map((ingredient) => ingredient.trim()),
        category,
        available: initialData?.available || true,
        dateAdded: initialData?.dateAdded || new Date().toISOString(),
      };
    }

    onSubmit(data);
    onClose(); // Đóng modal sau khi submit
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
          boxShadow: 5,
          borderRadius: 2,
          p: 4,
          overflow: 'hidden', // Changed from overflowY: 'auto' to overflow: 'hidden'
          maxHeight: '80vh', // Giới hạn chiều cao của modal
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom textAlign="center">
          {formType === 'add'
            ? formCategory
              ? 'Thêm Thể Loại'
              : 'Thêm Món Ăn'
            : formCategory
            ? 'Chỉnh Sửa Thể Loại'
            : 'Chỉnh Sửa Món Ăn'}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="dense"
            label={formCategory ? 'Tên Thể Loại' : 'Tên Món Ăn'}
            fullWidth
            variant="outlined"
            value={formCategory ? category : name}
            onChange={
              formCategory
                ? (e) => setCategory(e.target.value)
                : (e) => setName(e.target.value)
            }
            sx={textFieldStyle}
          />

          {!formCategory && (
            <>
              <TextField
                margin="dense"
                label="Giá"
                fullWidth
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                sx={textFieldStyle}
              />

              <TextField
                margin="dense"
                label="Mô Tả"
                fullWidth
                variant="outlined"
                multiline
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={textFieldStyle}
              />

              <TextField
                margin="dense"
                label="URL Hình Ảnh"
                fullWidth
                variant="outlined"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                sx={textFieldStyle}
              />

              <TextField
                margin="dense"
                label="Thời Gian Chuẩn Bị"
                fullWidth
                variant="outlined"
                value={preparationTime}
                onChange={(e) => setPreparationTime(e.target.value)}
                sx={textFieldStyle}
              />

              <TextField
                margin="dense"
                label="Nguyên Liệu (cách nhau bằng dấu phẩy)"
                fullWidth
                variant="outlined"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                sx={textFieldStyle}
              />

              <TextField
                margin="dense"
                label="Thể Loại"
                fullWidth
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={textFieldStyle}
              />
            </>
          )}
        </Box>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} color="inherit" sx={{ mr: 1 }}>
            Hủy
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {formType === 'add'
              ? formCategory
                ? 'Thêm'
                : 'Thêm'
              : formCategory
              ? 'Lưu'
              : 'Lưu'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

// Styles for text fields
const textFieldStyle = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#ddd',
    },
    '&:hover fieldset': {
      borderColor: '#aaa',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#1976d2', // Màu biên khi focus
    },
  },
};
