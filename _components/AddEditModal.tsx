import * as React from 'react';
import {
  Box,
  Modal,
  TextField,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import { Order } from '@/types/Order'; // Import Order interface
import { Category } from '@/types/Category'; // Import Category interface

interface AddEditModalProps<T extends Order | Category> {
  open: boolean;
  onClose: () => void;
  initialData?: T | null; // Dữ liệu ban đầu cho chỉnh sửa
  formType: 'add' | 'edit'; // Loại form (thêm hoặc chỉnh sửa)
  onSubmit: (data: T) => void; // Hàm xử lý khi submit form
  formCategory?: boolean; // Tham số xác định đây có phải là form category không
}

export default function AddEditModal<T extends Order | Category>({
  open,
  onClose,
  initialData,
  formType,
  onSubmit,
  formCategory = false, // Mặc định là false nếu không được truyền vào
}: AddEditModalProps<T>) {
  const isCategoryForm = formCategory;
  const [order, setOrder] = React.useState(initialData?.order || '');
  const [menu, setMenu] = React.useState(initialData?.menu || '');
  const [quantity, setQuantity] = React.useState(initialData?.quantity || 0);
  const [price, setPrice] = React.useState(initialData?.price || 0);
  const [description, setDescription] = React.useState(
    initialData?.description || ''
  );
  const [category, setCategory] = React.useState(initialData?.name || '');

  const [stock, setStock] = React.useState(initialData?.stock || 0);

  const handleSubmit = () => {
    let data: T;
    if (isCategoryForm) {
      data = {
        // Thông tin cho category
        category_id: initialData?.category_id || Date.now().toString(),
        name: category,
        description,
        createdAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
        img: initialData?.img || '',
      } as Category;
    } else {
      data = {
        // Thông tin cho order
        id: initialData?.id || Date.now(),
        order,
        menu,
        quantity,
        price,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } as Order;
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
          overflow: 'hidden',
          maxHeight: '80vh',
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom textAlign="center">
          {formType === 'add'
            ? isCategoryForm
              ? 'Thêm Thể Loại'
              : 'Thêm Đơn Hàng'
            : isCategoryForm
            ? 'Chỉnh Sửa Thể Loại'
            : 'Chỉnh Sửa Đơn Hàng'}
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Box component="form" noValidate autoComplete="off">
          {isCategoryForm && (
            <>
              <TextField
                margin="dense"
                label="Tên Thể Loại"
                fullWidth
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                label="URL ảnh"
                fullWidth
                variant="outlined"
                value={initialData?.img || ''}
                onChange={(e) => setCategory(e.target.value)}
                sx={textFieldStyle}
              />

              <TextField
                margin="dense"
                label="Số lượng"
                fullWidth
                variant="outlined"
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                sx={textFieldStyle}
              />
            </>
          )}
          {!isCategoryForm && (
            <>
              <TextField
                margin="dense"
                label="Mã Đơn Hàng"
                fullWidth
                variant="outlined"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                margin="dense"
                label="Mã Món Ăn"
                fullWidth
                variant="outlined"
                value={menu}
                onChange={(e) => setMenu(e.target.value)}
                sx={textFieldStyle}
              />
              <TextField
                margin="dense"
                label="Số Lượng"
                fullWidth
                variant="outlined"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                sx={textFieldStyle}
              />
              <TextField
                margin="dense"
                label="Giá"
                fullWidth
                variant="outlined"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
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
              ? isCategoryForm
                ? 'Thêm'
                : 'Thêm'
              : isCategoryForm
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
