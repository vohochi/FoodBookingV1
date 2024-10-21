// app/modalForm/MenuForm.tsx
import * as React from 'react';
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
} from '@mui/material';
import { Menu } from '@/types/Menu'; // Import Menu interface

interface MenuFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: Menu | null; // Dữ liệu ban đầu cho chỉnh sửa
  formType: 'add' | 'edit'; // Loại form (thêm hoặc chỉnh sửa)
  onSubmit: (data: Menu) => void; // Hàm xử lý khi submit form
}

export default function MenuForm({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
}: MenuFormProps) {
  const [menu_id, setMenuId] = React.useState(initialData?.menu_id || 0);
  const [name, setName] = React.useState(initialData?.name || '');
  const [description, setDescription] = React.useState(
    initialData?.description || ''
  );
  const [price, setPrice] = React.useState(initialData?.price || 0);
  const [category_id, setCategoryId] = React.useState(
    initialData?.category_id || 0
  );

  const handleSubmit = () => {
    const newMenu: Menu = {
      menu_id: initialData?.menu_id || Date.now(),
      name,
      description,
      price,
      category_id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    onSubmit(newMenu);
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
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflow: 'hidden',
          maxHeight: '80vh',
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom textAlign="center">
          {formType === 'add' ? 'Thêm Món Ăn' : 'Chỉnh Sửa Món Ăn'}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate autoComplete="off">
          <TextField
            margin="normal"
            label="Mã Món Ăn"
            fullWidth
            variant="outlined"
            value={menu_id}
            onChange={(e) => setMenuId(Number(e.target.value))}
            disabled={formType === 'edit'}
          />
          <TextField
            margin="normal"
            label="Tên Món Ăn"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Mô Tả"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            label="Giá"
            fullWidth
            variant="outlined"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-id-label">Danh mục</InputLabel>
            <Select
              labelId="category-id-label"
              id="category-id"
              value={category_id}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              {/* Populate categories from your data */}
              <MenuItem value={1}>Category 1</MenuItem>
              <MenuItem value={2}>Category 2</MenuItem>
              {/* ... */}
            </Select>
          </FormControl>
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
