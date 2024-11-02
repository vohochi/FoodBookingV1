import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { styled } from '@mui/material/styles';

interface ActionButtonsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onAdd?: () => void;
  onLock?: () => void;
  onDetails?: () => void; // New prop for details button
  detail?: boolean;
  edit?: boolean;
  delete?: boolean;
  add?: boolean;
  lock?: boolean;
  isLocked?: boolean; // Thêm prop để kiểm tra trạng thái khóa
}

// Styled Button with small size
const StyledButton = styled(Button)(() => ({
  borderRadius: '8px',
  padding: '4px 12px',
  textTransform: 'none',
  fontSize: '0.875rem',
  fontWeight: 500,
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 8px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  minHeight: '32px',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.3s ease-out',
  },

  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: 'rgba(0, 0, 0, 0.15) 0px 4px 12px',

    '&::before': {
      transform: 'translateX(0)',
    },
  },

  '&:active': {
    transform: 'translateY(1px)',
  },
}));

// Styled Lock Icon
const StyledIcon = styled('div')(() => ({
  fontSize: 22,
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  padding: '3px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    transform: 'scale(1.1) rotate(-10deg)',
    backgroundColor: 'rgba(255, 69, 0, 0.1)',
  },

  '&:active': {
    transform: 'scale(0.95)',
  },
}));

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  onAdd,
  onLock,
  onDetails, // Include the details action
  detail = false,
  edit = false,
  delete: deleteProp = false,
  add = false,
  lock = false,
  isLocked = false, // Mặc định là false
}) => {
  return (
    <Box
      display="flex"
      gap={1}
      alignItems="center"
      sx={{
        '& > button': {
          minWidth: '80px',
        },
      }}
    >
      {detail && ( // Render the details button
        <StyledButton
          variant="outlined"
          color="info"
          onClick={onDetails}
          sx={{
            color: '#1976d2',
            borderColor: '#1976d2',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
            },
          }}
        >
          Chi tiết
        </StyledButton>
      )}
      {add && (
        <StyledButton
          variant="contained"
          color="success"
          onClick={onAdd}
          sx={{
            backgroundColor: '#2e7d32',
            '&:hover': {
              backgroundColor: '#1b5e20',
            },
          }}
        >
          Thêm
        </StyledButton>
      )}
      {edit && (
        <StyledButton
          variant="contained"
          color="primary"
          onClick={onEdit}
          sx={{
            backgroundColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#0d47a1',
            },
          }}
        >
          Sửa
        </StyledButton>
      )}
      {deleteProp && (
        <StyledButton
          variant="contained"
          color="error"
          onClick={onDelete}
          sx={{
            backgroundColor: '#d32f2f',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
          }}
        >
          Xóa
        </StyledButton>
      )}
      {lock && (
        <StyledIcon onClick={onLock}>
          {isLocked ? (
            <LockIcon
              sx={{
                color: '#d32f2f', // Màu đỏ khi đã khóa
                opacity: 0.7,
              }}
            />
          ) : (
            <LockOpenIcon
              sx={{
                color: '#2e7d32', // Màu xanh khi mở khóa
              }}
            />
          )}
        </StyledIcon>
      )}
    </Box>
  );
};

export default ActionButtons;
