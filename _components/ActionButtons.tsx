// components/ActionButtons.tsx
import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

interface ActionButtonsProps {
  onEdit?: () => void; // Hàm xử lý hành động chỉnh sửa
  onDelete?: () => void; // Hàm xử lý hành động xóa
  onAdd?: () => void; // Hàm xử lý hành động thêm
  edit?: boolean; // Hiển thị nút Edit nếu true
  delete?: boolean; // Hiển thị nút Delete nếu true
  add?: boolean; // Hiển thị nút Add nếu true
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  onAdd,
  edit = false, // Mặc định là false
  delete: deleteProp = false, // Mặc định là false
  add = false, // Mặc định là false
}) => {
  return (
    <Box display="flex" gap={1}>
      {add && (
        <Button
          variant="contained"
          color="success"
          onClick={onAdd}
          sx={{
            borderRadius: '8px',
            padding: '6px 16px',
            textTransform: 'none',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
            ':hover': {
              backgroundColor: '#388e3c',
            },
          }}
        >
          Thêm
        </Button>
      )}
      {edit && (
        <Button
          variant="contained"
          color="primary"
          onClick={onEdit}
          sx={{
            borderRadius: '8px',
            padding: '6px 16px',
            textTransform: 'none',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
            ':hover': {
              backgroundColor: '#1976d2',
            },
          }}
        >
          Edit
        </Button>
      )}
      {deleteProp && (
        <Button
          variant="contained"
          color="secondary"
          onClick={onDelete}
          sx={{
            borderRadius: '8px',
            padding: '6px 16px',
            textTransform: 'none',
            boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.3s ease',
            ':hover': {
              backgroundColor: '#d32f2f',
            },
          }}
        >
          delete
        </Button>
      )}
    </Box>
  );
};

export default ActionButtons;
